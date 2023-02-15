package io.cordova.hellocordova;

import android.app.Activity;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.ImageDecoder;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.WebView;
import androidx.core.content.FileProvider;
import androidx.core.content.pm.ShortcutInfoCompat;
import androidx.core.content.pm.ShortcutManagerCompat;
import androidx.core.graphics.drawable.IconCompat;
import java.io.File;
import java.lang.SecurityException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Native extends CordovaPlugin {

  private Activity activity;
  private Context context;
  private CallbackContext onRequestPermissionResultCallback;
  private int REQ_PERMISSIONS = 1;
  private int REQ_PERMISSION = 2;
  private int themeColor = 0xFF000000;
  private String themeType = "dark";
  private CallbackContext intentHandler;

  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    this.context = cordova.getContext();
    this.activity = cordova.getActivity();
  }

  public boolean execute(
    String action,
    final JSONArray args,
    final CallbackContext callback
  )
    throws JSONException {
    try {
      final Method method =
        this.getClass()
          .getDeclaredMethod(action, JSONArray.class, CallbackContext.class);
      if (method != null) {
        method.invoke(this, args, callback);
        return true;
      }
      return false;
    } catch (NoSuchMethodException e) {
      callback.error(e.getMessage());
      return false;
    } catch (SecurityException e) {
      callback.error(e.getMessage());
      return false;
    } catch (Exception e) {
      callback.error(e.getMessage());
      return false;
    }
  }

  public void requestPermissions(JSONArray args, CallbackContext callback) {
    CordovaPlugin thisPlugin = this;
    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            JSONArray permissions = args.optJSONArray(0);
            try {
              if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
                int[] res = new int[permissions.length()];
                for (int i = 0; i < res.length; ++i) {
                  res[i] = 1;
                }
                callback.success(1);
                return;
              }

              String[] noPermissions = checkPermissions(permissions);

              if (noPermissions.length > 0) {
                cordova.requestPermissions(
                  thisPlugin,
                  REQ_PERMISSIONS,
                  noPermissions
                );
                return;
              }
              onRequestPermissionResultCallback = callback;
            } catch (Exception e) {
              callback.error(e.toString());
            }
          }
        }
      );
  }

  public void requestPermission(JSONArray args, CallbackContext callback) {
    CordovaPlugin thisPlugin = this;
    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            String permission = args.optString(0);
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
              callback.success(1);
              return;
            }

            if (permission != null || !permission.equals("")) {
              if (!cordova.hasPermission(permission)) {
                cordova.requestPermission(
                  thisPlugin,
                  REQ_PERMISSION,
                  permission
                );
                return;
              }

              onRequestPermissionResultCallback = callback;
            }

            callback.error("No permission passed to request.");
          }
        }
      );
  }

  public void hasPermission(JSONArray args, CallbackContext callback) {
    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            String permission = args.optString(0);
            if (permission != null || !permission.equals("")) {
              int res = 0;
              if (cordova.hasPermission(permission)) {
                res = 1;
              }

              callback.success(res);
              return;
            }
            callback.error("No permission passed to check.");
          }
        }
      );
  }

  public void getWebkitInfo(JSONArray args, CallbackContext callback) {
    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            PackageInfo info = null;
            JSONObject res = new JSONObject();

            try {
              if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                info = WebView.getCurrentWebViewPackage();
              } else if (
                Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP
              ) {
                Class webViewFactory = Class.forName(
                  "android.webkit.WebViewFactory"
                );
                Method method = webViewFactory.getMethod(
                  "getLoadedPackageInfo"
                );
                info = (PackageInfo) method.invoke(null);
              } else {
                PackageManager packageManager = activity.getPackageManager();

                try {
                  info =
                    packageManager.getPackageInfo(
                      "com.google.android.webview",
                      0
                    );
                } catch (PackageManager.NameNotFoundException e) {
                  callback.error("Package not found");
                }

                return;
              }

              res.put("packageName", info.packageName);
              res.put("versionName", info.versionName);
              res.put("versionCode", info.versionCode);

              callback.success(res);
            } catch (
              JSONException
              | InvocationTargetException
              | ClassNotFoundException
              | NoSuchMethodException
              | IllegalAccessException e
            ) {
              callback.error(
                "Cannot determine current WebView engine. (" +
                e.getMessage() +
                ")"
              );

              return;
            }
          }
        }
      );
  }

  public void shareFile(JSONArray args, CallbackContext callback) {
    String fileURI = args.optString(0);
    String filename = args.optString(1);

    Activity activity = this.activity;
    Context context = this.context;
    Uri uri = this.getContentProviderUri(fileURI);

    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            try {
              Intent intent = new Intent(Intent.ACTION_SEND);
              intent.putExtra(Intent.EXTRA_STREAM, uri);
              if (!filename.equals("")) intent.putExtra(
                Intent.EXTRA_TEXT,
                filename
              );
              intent.setType("application/octet-stream");
              activity.startActivity(intent);
              callback.success(uri.toString());
            } catch (Exception e) {
              callback.error(e.getMessage());
            }
          }
        }
      );
  }

  public void getAppInfo(JSONArray args, CallbackContext callback) {
    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            JSONObject res = new JSONObject();
            try {
              PackageManager pm = activity.getPackageManager();
              PackageInfo pInfo = pm.getPackageInfo(
                context.getPackageName(),
                0
              );
              ApplicationInfo appInfo = context.getApplicationInfo();

              res.put("firstInstallTime", pInfo.firstInstallTime);
              res.put("lastUpdateTime", pInfo.lastUpdateTime);
              res.put("label", appInfo.loadLabel(pm).toString());
              res.put("packageName", pInfo.packageName);
              res.put("versionName", pInfo.versionName);
              res.put("versionCode", pInfo.getLongVersionCode());

              callback.success(res);
            } catch (JSONException e) {
              callback.error(e.getMessage());
            } catch (Exception e) {
              callback.error(e.getMessage());
            }
          }
        }
      );
  }

  public void openInBrowser(JSONArray args, CallbackContext callback) {
    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            String src = args.optString(0);
            Intent browserIntent = new Intent(
              Intent.ACTION_VIEW,
              Uri.parse(src)
            );
            activity.startActivity(browserIntent);
            callback.success();
          }
        }
      );
  }

  public void addShortcut(JSONArray args, CallbackContext callback) {
    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            String id = args.optString(0);
            String label = args.optString(1);
            String description = args.optString(2);
            String iconSrc = args.optString(3);
            String action = args.optString(4);
            String data = args.optString(5);

            try {
              Intent intent;
              ImageDecoder.Source imgSrc;
              Bitmap bitmap;
              IconCompat icon;

              imgSrc =
                ImageDecoder.createSource(
                  context.getContentResolver(),
                  Uri.parse(iconSrc)
                );
              bitmap = ImageDecoder.decodeBitmap(imgSrc);
              icon = IconCompat.createWithBitmap(bitmap);
              intent =
                activity
                  .getPackageManager()
                  .getLaunchIntentForPackage(activity.getPackageName());
              intent.putExtra("action", action);
              intent.putExtra("data", data);

              ShortcutInfoCompat shortcut = new ShortcutInfoCompat.Builder(
                context,
                id
              )
                .setShortLabel(label)
                .setLongLabel(description)
                .setIcon(icon)
                .setIntent(intent)
                .build();

              ShortcutManagerCompat.pushDynamicShortcut(context, shortcut);
              callback.success();
            } catch (Exception e) {
              callback.error(e.toString());
            }
          }
        }
      );
  }

  public void pinShortcut(JSONArray args, CallbackContext callback) {
    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            String id = args.optString(0);
            ShortcutManager shortcutManager = context.getSystemService(
              ShortcutManager.class
            );

            if (shortcutManager.isRequestPinShortcutSupported()) {
              ShortcutInfo pinShortcutInfo = new ShortcutInfo.Builder(
                context,
                id
              )
                .build();

              Intent pinnedShortcutCallbackIntent = shortcutManager.createShortcutResultIntent(
                pinShortcutInfo
              );

              PendingIntent successCallback = PendingIntent.getBroadcast(
                context,
                0,
                pinnedShortcutCallbackIntent,
                0
              );

              shortcutManager.requestPinShortcut(
                pinShortcutInfo,
                successCallback.getIntentSender()
              );

              callback.success();
            }

            callback.error("Not suppported");
          }
        }
      );
  }

  public void removeShortcut(JSONArray args, CallbackContext callback) {
    cordova
      .getThreadPool()
      .execute(
        new Runnable() {
          public void run() {
            String id = args.optString(0);
            try {
              List<String> list = new ArrayList<String>();
              list.add(id);
              ShortcutManagerCompat.removeDynamicShortcuts(context, list);
              callback.success();
            } catch (Exception e) {
              callback.error(e.toString());
            }
          }
        }
      );
  }

  public void setUiTheme(JSONArray args, CallbackContext callback) {
    cordova
      .getActivity()
      .runOnUiThread(
        new Runnable() {
          public void run() {
            String color = args.optString(0);
            String type = args.optString(1);
            if (Build.VERSION.SDK_INT >= 21) {
              int bgColor = Color.parseColor(color);
              Window window = activity.getWindow();
              themeColor = bgColor;
              themeType = type.toLowerCase();
              // Method and constants not available on all SDKs but we want to be able to compile this code with any SDK
              window.clearFlags(0x04000000); // SDK 19: WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS;
              window.addFlags(0x80000000); // SDK 21: WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS;
              try {
                // Using reflection makes sure any 5.0+ device will work without having to compile with SDK level 21

                window
                  .getClass()
                  .getMethod("setNavigationBarColor", int.class)
                  .invoke(window, themeColor);

                window
                  .getClass()
                  .getMethod("setStatusBarColor", int.class)
                  .invoke(window, themeColor);

                setStatusBarStyle(window);
                setNavigationBarStyle(window);
              } catch (IllegalArgumentException ignore) {
                // ignore
              } catch (Exception ignore) {
                // ignore
              }
            }
          }
        }
      );
  }

  public void setIntentHandler(JSONArray args, CallbackContext callback) {
    intentHandler = callback;
  }

  @Override
  public void onNewIntent(Intent intent) {
    if (intentHandler != null) {
      PluginResult result = new PluginResult(
        PluginResult.Status.OK,
        getIntentJson(intent)
      );
      result.setKeepCallback(true);
      intentHandler.sendPluginResult(result);
    }
  }

  private JSONObject getIntentJson(Intent intent) {
    JSONObject json = new JSONObject();
    try {
      json.put("action", intent.getAction());
      json.put("data", intent.getDataString());
      json.put("type", intent.getType());
      json.put("package", intent.getPackage());
      json.put("extras", getExtrasJson(intent.getExtras()));
    } catch (JSONException e) {
      e.printStackTrace();
    }
    return json;
  }

  private JSONObject getExtrasJson(Bundle extras) {
    JSONObject json = new JSONObject();
    if (extras != null) {
      for (String key : extras.keySet()) {
        try {
          Object value = extras.get(key);
          if (value instanceof String) {
            json.put(key, (String) value);
          } else if (value instanceof Integer) {
            json.put(key, (Integer) value);
          } else if (value instanceof Long) {
            json.put(key, (Long) value);
          } else if (value instanceof Double) {
            json.put(key, (Double) value);
          } else if (value instanceof Float) {
            json.put(key, (Float) value);
          } else if (value instanceof Boolean) {
            json.put(key, (Boolean) value);
          } else if (value instanceof Bundle) {
            json.put(key, getExtrasJson((Bundle) value));
          } else {
            json.put(key, value.toString());
          }
        } catch (JSONException e) {
          e.printStackTrace();
        }
      }
    }
    return json;
  }

  private Uri getContentProviderUri(String fileUri) {
    Uri uri = Uri.parse(fileUri);
    String Id = context.getPackageName();
    if (fileUri.matches("file:///(.*)")) {
      File file = new File(uri.getPath());
      uri = FileProvider.getUriForFile(context, Id + ".provider", file);
    }
    return uri;
  }

  private boolean isPackageInstalled(
    String packageName,
    PackageManager packageManager
  ) {
    try {
      packageManager.getPackageInfo(packageName, 0);
      return true;
    } catch (PackageManager.NameNotFoundException e) {
      return false;
    }
  }

  private void setStatusBarStyle(Window window) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      View decorView = window.getDecorView();
      int uiOptions = decorView.getSystemUiVisibility();

      if (themeType.equals("light")) {
        decorView.setSystemUiVisibility(
          uiOptions | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
        );
        return;
      }
      decorView.setSystemUiVisibility(
        uiOptions & ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
      );
    }
  }

  private void setNavigationBarStyle(Window window) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      View decorView = window.getDecorView();
      int uiOptions = decorView.getSystemUiVisibility();

      // 0x80000000 FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS
      // 0x00000010 SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR

      if (themeType.equals("light")) {
        decorView.setSystemUiVisibility(uiOptions | 0x80000000 | 0x00000010);
        return;
      }
      decorView.setSystemUiVisibility(uiOptions | 0x80000000 & ~0x00000010);
    }
  }

  public void onRequestPermissionResult(
    int code,
    String[] permissions,
    int[] resCodes
  ) {
    if (code == REQ_PERMISSIONS) {
      JSONArray resAr = new JSONArray();
      for (int res : resCodes) {
        if (res == PackageManager.PERMISSION_DENIED) {
          resAr.put(0);
        }
        resAr.put(1);
      }

      onRequestPermissionResultCallback.success(resAr);
      return;
    }

    if (
      resCodes.length >= 1 && resCodes[0] == PackageManager.PERMISSION_DENIED
    ) {
      onRequestPermissionResultCallback.success(0);
      return;
    }
    onRequestPermissionResultCallback.success(1);
    return;
  }

  private String[] checkPermissions(JSONArray arr) throws Exception {
    List<String> list = new ArrayList<String>();
    for (int i = 0; i < arr.length(); i++) {
      try {
        String permission = arr.getString(i);
        if (permission != null || !permission.equals("")) {
          throw new Exception("Permission cannot be null or empty");
        }
        if (!cordova.hasPermission(permission)) {
          list.add(permission);
        }
      } catch (JSONException e) {}
    }

    String[] res = new String[list.size()];
    return list.toArray(res);
  }
}
