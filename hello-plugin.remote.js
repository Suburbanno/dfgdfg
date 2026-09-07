// hello-iitcx.user.js
(function () {
  "use strict";

  const plugin = {
    manifest: {
      id: "hello-iitcx",
      name: "Hello IITCX",
      version: "1.0.0",
      description: "Plugin nativo de teste do IITCX",
      author: "Suburbanno"
    },

    setup(ctx) {
      let selectedPortals = 0;

      ctx.on("portalSelected", function () {
        selectedPortals += 1;

        const counter = document.querySelector(
          "[data-hello-iitcx-counter]"
        );

        if (counter) {
          counter.textContent =
            "Portais selecionados: " + selectedPortals;
        }
      });

      ctx.addPanel({
        id: "hello-panel",
        title: "Hello IITCX",

        render(container) {
          container.innerHTML = `
            <div data-hello-iitcx-counter>
              Portais selecionados: 0
            </div>
            <p>Plugin nativo carregado.</p>
          `;

          return function cleanup() {
            container.replaceChildren();
          };
        }
      });

      ctx.addButton({
        id: "hello-button",
        title: "Testar Hello IITCX",
        icon: "Hi",

        onClick() {
          ctx.log(
            "Portais selecionados: " + selectedPortals
          );
        }
      });

      return function cleanup() {
        ctx.log("Hello IITCX removido");
      };
    }
  };

  /*
   * O plugin é registrado pela API pública do IITCX.
   */
  if (
    window.iitcx &&
    window.iitcx.plugins &&
    typeof window.iitcx.plugins.register === "function"
  ) {
    window.iitcx.plugins.register(plugin);
    return;
  }

  console.error(
    "[Hello IITCX] A API window.iitcx.plugins não está disponível."
  );
})();
