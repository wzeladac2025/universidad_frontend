import { ElLoading } from "element-plus";

export class Loading {
  constructor() {}

  static loading(mensaje: string) {
    const loading = ElLoading.service({
      lock: true,
      text: mensaje,
      background: "rgba(14, 13, 77, 0.95)"
    });

    return loading;
  }
}
