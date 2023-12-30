import { defineConfig ,loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig(({ command, mode }) => {
 
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.PROJECTS_URL);
  console.log(env.COMMUNICATION_URL);

  return {
    plugins: [
      react(),
      federation({
        name: 'infra-app',
        remotes: {
            project_app: env.PROJECTS_URL,
            message_app: env.COMMUNICATION_URL,
        },
        shared: ['react', 'react-dom']
      
        })
      ] ,
      build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false
      }
    }
})

