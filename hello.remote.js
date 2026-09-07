/*
 * hello-plugin.remote.js
 *
 * Plugin nativo IITCX.
 *
 * Compatível com instalação via URL no gerenciador de plugins.
 */

export default {
  manifest: {
    id: "hello-remotev2",
    name: "Hello Remotev2",
    version: "1.0.1",
    description: "Plugin nativo de teste do IITCX.",
    author: "IITCX"
  },

  setup(ctx) {
    let selectedPortals = 0;
    let counterElement;
    let statusElement;

    function updateCounter() {
      if (counterElement) {
        counterElement.textContent =
          `Portais selecionados: ${selectedPortals}`;
      }
    }

    const unsubscribePortalSelected = ctx.on(
      "portalSelected",
      function (data) {
        selectedPortals += 1;
        updateCounter();

        ctx.log("Portal selecionado:", data.guid);
      }
    );

    const removePanel = ctx.addPanel({
      id: "status",
      title: "Hello Remote",

      render(container) {
        statusElement = document.createElement("div");
        statusElement.textContent = "Plugin nativo carregado.";

        counterElement = document.createElement("div");
        counterElement.textContent =
          "Portais selecionados: 0";

        container.appendChild(statusElement);
        container.appendChild(counterElement);

        return function cleanupPanel() {
          counterElement = undefined;
          statusElement = undefined;
          container.replaceChildren();
        };
      }
    });

    const removeButton = ctx.addButton({
      id: "log",
      title: "Mostrar contagem no console",
      icon: "Hi",

      onClick() {
        ctx.log(
          `Portais selecionados: ${selectedPortals}`
        );
      }
    });

    ctx.log("Hello Remote instalado.");

    return function cleanup() {
      unsubscribePortalSelected();
      removePanel();
      removeButton();

      counterElement = undefined;
      statusElement = undefined;

      ctx.log("Hello Remote removido.");
    };
  }
};
