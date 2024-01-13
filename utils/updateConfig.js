/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const { networkInterfaces } = require('os');
const { parseStringPromise, Builder } = require('xml2js');

module.exports = async (mode = 'dev') => {
  const configXml = path.resolve('config.xml');
  const config = fs.readFileSync(configXml, 'utf-8');
  const configJson = await parseStringPromise(config);
  const ip = getIp();
  const port = '5500';
  const src = `https://${ip || '10.0.0'}:${port}`;

  configJson.widget.platform.forEach((platform) => {
    if (mode === 'dev') {
      platform.content = [{ $: { src } }];
    } else if (platform.content) {
      delete platform.content;
    }
  });

  const builder = new Builder({
    renderOpts: {
      indent: '    ',
      pretty: true,
    },
  });
  const newConfig = builder.buildObject(configJson);
  fs.writeFileSync(configXml, newConfig);
  return { ip, port };
};

function getIp() {
  const nets = networkInterfaces();
  let ip = '';

  Object.keys(nets).some((name) => {
    return nets[name].find((net) => {
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
      if (net.family === familyV4Value && !net.internal) {
        ip = net.address;
        return ip;
      }
    });
  });

  return ip;
}
