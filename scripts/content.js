const insert = (content) => {
    const elements = document.getElementsByClassName('Am Al editable LW-avf tS-tW');

    if (elements.length === 0) {
    return;
    }

    const element = elements[0];
    
    element.childNodes.forEach((element) => {
        element.remove();
    });

    const splitContent = content.split('\n');

    splitContent.forEach((content) => {
        const p = document.createElement('p');
      
        if (content === '') {
          const br = document.createElement('br');
          p.appendChild(br);
        } else {
          p.textContent = content;
        }
      
        // Insert into HTML one at a time
        element.appendChild(p);
    });
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'inject') {
      const { content } = request;
			
      const result = insert(content);
			
      if (!result) {
        sendResponse({ status: 'failed' });
      }

      sendResponse({ status: 'success' });
    }
  }
);