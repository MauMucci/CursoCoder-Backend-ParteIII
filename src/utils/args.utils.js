import { Command } from "commander";

const args = new Command();

args.option("-p <port>", "puerto", 9000); //comando,descripcion,valor
args.option("--mode <mode>", "modo", "dev");

args.parse();

export default args.opts();
