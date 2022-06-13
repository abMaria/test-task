import App from "@/App.vue";
import "@/assets/sass/bundle.sass";
import { bootstrap } from "@/lib/modules";
import modules from "@/modules";
import { createApp } from "vue";

bootstrap(createApp(App), modules);
