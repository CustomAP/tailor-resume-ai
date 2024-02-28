export function init() {
  chrome.runtime.onMessage.addListener((request) => {
    let dialog = <HTMLDialogElement>(
      document.getElementById("tailoredResumeDialog")
    );

    if (!dialog) {
      const modal = document.createElement("dialog");
      modal.setAttribute("id", "tailoredResumeDialog");
      modal.setAttribute(
        "style",
        "width: 450px; height: 40%; border: 0px; border-radius: 10px"
      );
      modal.innerHTML = `<div style="width:100%; height:100%"><iframe id="tailoredResume" style="height:100%; width:100%"></iframe></div>
      <div style="position:absolute; top:5px; left:5px;">  
          <button style="border-radius: 7px border:0px">x</button>
      </div>`;
      const iframe = <HTMLIFrameElement>(
        document.getElementById("tailoredResume")
      );

      document.body.appendChild(modal);
    }

    if (request.type === "tailorResumeSuccess") {
      dialog = <HTMLDialogElement>(
        document.getElementById("tailoredResumeDialog")
      );
      if (dialog !== null) {
        dialog.showModal();
        const iframe = <HTMLIFrameElement>(
          document.getElementById("tailoredResume")
        );
        if (iframe !== null) {
          iframe.src = request.url;
          const dialogButton = dialog.querySelector("button");
          if (dialogButton !== null) {
            dialogButton.addEventListener("click", () => {
              dialog.close();
              document.getElementById("tailoredResumeDialog")?.remove();
            });
          }
        }
      }
    }
  });
}

init();
