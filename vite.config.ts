import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  base: "",
});
