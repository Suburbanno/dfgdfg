export default {
  manifest: {
    id: "hello-remote",
    name: "Hello Remote",
    version: "1.0.0",
    description: "Plugin de teste",
    author: "IITCX"
  },

  setup(ctx) {
    ctx.addPanel({
      id: "hello-panel",
      title: "Hello Remote",

      render(container) {
        container.textContent = "Plugin instalado com sucesso";

        return () => {
          container.replaceChildren();
        };
      }
    });

    ctx.addButton({
      id: "hello-button",
      title: "Testar plugin",
      icon: "Hi",

      onClick() {
        ctx.log("Botão do plugin clicado");
      }
    });
  }
};
