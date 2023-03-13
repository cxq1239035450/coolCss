
import { defineConfig  } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

export default ({  }) => {
  const config = {
    base: './',
    plugins: [
      vue(),vueJsx()
      // eslintPlugin({
      //   include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      // })
    ],
    resolve: {
      alias: {
        '@': '/src'
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },

  }
  return defineConfig(config)
}
