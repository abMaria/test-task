import type { Module } from "@/lib/modules";
import checkout from "@/modules/checkout/module";
import dashboard from "@/modules/dashboard/module";

const modules: Module[] = [dashboard, checkout];

export default modules;
