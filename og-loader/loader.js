
// Defining a custom element 
class OGLoader extends HTMLElement {

    /*  This is a statis getter method that return an array of attrivte names to be observed for changes */
    static get observedAttributes() {
        return ['color', 'borderColor', 'speed', 'show']
    }


    constructor() {
        super();
        console.log("component", this)

        /*Attaching a shadow dom to the component*/
        this.attachShadow({ mode: 'open' })
    }

    // HTML lifecycle callback


    /* Invoked each time the custom element is appended into a DOM element */
    connectedCallback() {
        // console.log('Element added to page.');
        this.render()
    }

    /* Invoked each time the custom element is disconnected into a DOM element */
    disconnectedCallback() {
        // console.log('Element removed from page.');
    }


    /* Invoked each time the custom element is moved to a new document */
    adoptedCallback() {
        // console.log('Element moved to new page.');
    }


    /* Invoked each time one of the custom elements is added, removed, or changed */
    attributeChangedCallback() {
        // console.log('Attribute: ' + name + ' was changed from ' + oldValue + ' to ' + newValue);
    }


    render() {
        const color = this.getAttribute('color') || '#3498db';
        const borderColor = this.getAttribute('borderColor') || '#f3f3f3'
        const speed = this.getAttribute('speed') || '2s';
        const show = this.getAttribute('show')|| "true";
        // console.log(typeof show)
        this.shadowRoot.innerHTML = this.getTemplate(show, color, borderColor, speed);
    }


    getTemplate(show, color, borderColor, speed) {
        return `
        <style>
        :host {
          display: ${show==="true" ? 'flex' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .loader {
          border: 6px solid ${borderColor};
          border-top: 6px solid ${color};
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin ${speed} linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="loader"></div>
        `
    }

}

// Registering a custom element
window.customElements.define('og-loader', OGLoader);
