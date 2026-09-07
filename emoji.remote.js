/*
 * IITCX Comm Emoji
 *
 * Plugin nativo IITCX.
 * Adiciona um botão de emojis ao lado do botão Send da Comm.
 */

export default {
  manifest: {
    id: "comm-emoji",
    name: "Comm Emoji",
    version: "1.0.0",
    description: "Adiciona um seletor de emojis ao lado do botão Send da Comm.",
    author: "Suburbanno"
  },

  setup(ctx) {
    const emojis = [
      "😀", "😂", "😍", "😎", "🤔",
      "😅", "😭", "😡", "👍", "👎",
      "👏", "🙏", "🔥", "💚", "💙",
      "⭐", "🎉", "⚡", "👀", "🚀"
    ];

    let picker;

    function getShadowRoot() {
      return document.querySelector("iitcx-root")?.shadowRoot;
    }

    function closePicker() {
      if (picker) {
        picker.remove();
        picker = undefined;
      }
    }

    function createPicker(insertText) {
      const shadowRoot = getShadowRoot();
      if (!shadowRoot) {
        ctx.warn("IITCX Shadow Root não encontrado.");
        return;
      }

      const composer = shadowRoot.querySelector(".iitcx-comm-compose");

      if (!composer) {
        ctx.warn("Composer da Comm não encontrado.");
        return;
      }

      picker = document.createElement("div");
      picker.className = "iitcx-emoji-picker";

      for (const emoji of emojis) {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = emoji;
        button.title = `Inserir ${emoji}`;
        button.setAttribute("aria-label", `Inserir ${emoji}`);

        button.addEventListener("click", () => {
          insertText(emoji);
          closePicker();
        });

        picker.appendChild(button);
      }

      composer.appendChild(picker);
    }

    const removeButton = ctx.addCommButton({
      id: "emoji-picker",
      title: "Inserir emoji",
      icon: "🙂",

      onClick(_ctx, insertText) {
        if (picker) {
          closePicker();
          return;
        }

        createPicker(insertText);
      }
    });

    ctx.log("Plugin Comm Emoji instalado.");

    return () => {
      closePicker();
      removeButton();
      ctx.log("Plugin Comm Emoji removido.");
    };
  }
};
