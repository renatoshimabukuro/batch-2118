**Importante ❗** Este ejercicio será programado en vivo por el profesor. No es necesario que los estudiantes lo hagan por su cuenta. Pero, aquí hay algunas instrucciones para ayudar a guiar:

## Guía del Profesor: Lista de Regalos con StimulusJS

Como una sesión de programación en vivo (es decir, los estudiantes pueden intentarlo por su cuenta después de clase, pero no habrá tiempo de ticket para esto), refactorizarás el código para que use Stimulus.

Stimulus ya ha sido configurado y **controllers/gifts_controller.js** ha sido creado para ti, todo lo que necesitas hacer es refactorizar el código en `index.js` (que hemos desvinculado de `index.html`). Una vez que termines de refactorizar, puedes eliminar `index.js` ya que todo el JS estará en nuestro controlador. ¡Buena suerte!

### 1. Conectar el controlador al DOM

Usaremos un controlador Stimulus para todo el ejercicio, así que deberías seleccionar un elemento HTML (un `<div>` o similar) que tenga acceso a ambas listas y los formularios dentro de él.

```html
<!-- index.html -->

<div data-controller="gifts">
  <!-- [...] -->
</div>
```

### 2. Agregar un elemento mediante el formulario de regalos

#### 2.1. Convertir las entradas del formulario en data-targets

```html
<!-- index.html -->

<!-- [...] -->

<input type="text"
  class="form-control w-100 mt-2"
  id="name"
  data-gifts-target="nameInput">

<!-- [...] -->

<input type="text"
       class="form-control w-100 mt-2"
       id="name"
       data-gifts-target="priceInput">

<!-- [...] -->
```

```js
// controllers/gifts_controller.js

export default class extends Controller {
  static targets = ["nameInput", "priceInput"]

  // [...]
}
```

#### 2.2. Agregar un data-action al formulario

```html
<!-- index.html -->

<!-- [...] -->

<form data-action="submit->gifts#addItemViaForm"
      class="w-100 mx-auto">

<!-- [...] -->

```

```js
// controllers/gifts_controller.js

export default class extends Controller {
  // [...]

  addItemViaForm(e) {
    e.preventDefault()
    const name = this.nameInputTarget.value
    const price = this.priceInputTarget.value

    console.log(name)
    console.log(price)
  }
}
```

#### 2.1. Convertir la lista en un data-target

```html
<!-- index.html -->

<!-- [...] -->

<ol class="list"
  data-gifts-target="list">
</ol>

<!-- [...] -->
```

```js
// controllers/gifts_controller.js

export default class extends Controller {
  static targets = ["nameInput", "priceInput", "list"]

  // [...]
}
```

#### 2.2. Crear la función `toggleStrike` y terminar la función `addItemViaForm`

Con StimulusJS, podemos agregar el 'event listener' que alternará la presencia de la clase `.strike` directamente en el elemento `<li>` cuando lo creamos, lo que hace nuestra vida mucho más fácil.

```js
// controllers/gifts_controller.js

export default class extends Controller {
  // [...]

  toggleStrike(e) {
    e.currentTarget.classList.toggle('strike')
  }

  addItemViaForm(e) {
    e.preventDefault()
    const name = this.nameInputTarget.value
    const price = this.priceInputTarget.value

    const listItem = `<li
      class="gift-item"
      data-action="click->gifts#toggleStrike">
        ${name} - €${price}
      </li>`

    this.listTarget.insertAdjacentHTML('beforeend', listItem)
  }
}
```

¡Y eso es todo para el primer formulario!

### 2. Agregar un elemento mediante el formulario de ideas

#### 2.1. Convertir la entrada del formulario de ideas en un data-target

```html
<!-- index.html -->

<select class="form-select w-50"
        id="search-input"
        data-gifts-target="ideasInput">
  <!-- [...] -->
</select>
```

```
// controllers/gifts_controller.js

export default class extends Controller {
  static targets = ["nameInput", "priceInput", "list", "ideasInput"]

  // [...]
}
```

#### 2.2. Convertir la lista de ideas en un data-target

```html
<!-- index.html -->

<ul class="search-list"
  data-gifts-target="ideasList">
</ul>
```

```
// controllers/gifts_controller.js

export default class extends Controller {
  static targets = ["nameInput", "priceInput", "list", "ideasInput", "ideasList"]

  // [...]
}
```

#### 2.3. Agregar un data-action al formulario de ideas

```html
<!-- index.html -->

<form class="mt-4 search-form"
      data-action="submit->gifts#searchGifts">
    <!-- [...] -->
</form>
```

#### 2.3. Programar la función `searchGifts`

```js
// controllers/gifts_controller.js

export default class extends Controller {
  // [...]

  searchGifts(e) {
    e.preventDefault();

    const query = this.ideasInputTarget.value

    fetch(`https://fakestoreapi.com/products/category/${query}`)
      .then(res => res.json())
      .then(data => {
        data.forEach((item) => {
          const listItem = `<div class="d-flex align-items-center">
            <li>${item.title} - €${item.price}</li>
            <button class="btn btn-info btn-sm ms-2 text-white" data-action="click->gifts#moveItem">Agregar</button>
          </div>`
          this.ideasListTarget.insertAdjacentHTML('beforeend', listItem)
        })
      });
  }
}
```

#### 2.3. Programar la función `moveItem`

```js
moveItem(e) {
  const item = e.currentTarget.parentElement;
  const li = item.querySelector('li');

  li.setAttribute('data-action', 'click->gifts#toggleStrike');
  li.classList.add('gift-item');

  this.listTarget.appendChild(li);

  item.remove();
}
```
