// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import mockModules from "./api/user";
/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
