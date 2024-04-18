import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;
import os from "os";

const myFormat = printf(({ level, message, label, timestamp }) => {
  const hostName = os.hostname();
  const ipAddress = getIPAddress();
  const appName = process.env.APP_NAME;
  return `${timestamp} ${label} [${level}]: ${appName} application is started : ${hostName} - ${ipAddress} : ${message}`;
});

const devLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      format.colorize(),
      label({ label: "dev" }),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      myFormat
    ),
    transports: [new transports.Console()],
  });
};

function getIPAddress() {
  const ifaces = os.networkInterfaces();
  let ipAddress = "Unknown";
  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if (iface.family === "IPv4" && !iface.internal) {
        ipAddress = iface.address;
      }
    });
  });
  return ipAddress;
}
export default devLogger;
