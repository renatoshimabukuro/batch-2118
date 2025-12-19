**Important ❗** Cet exercice sera codé en direct par le professeur. Il n'est pas nécessaire que les étudiant·es le fassent par eux-mêmes. Mais voici quelques instructions pour guider :

## Guide du Professeur : Liste de Cadeaux avec StimulusJS

Comme un live-code uniquement (c'est-à-dire que les étudiant·es peuvent essayer par eux-mêmes après le cours, mais il n'y aura pas de temps de ticket pour cela), tu vas refactoriser le code pour qu'il utilise Stimulus.

Stimulus a déjà été configuré et **controllers/gifts_controller.js** a été créé pour toi, tu n'as qu'à refactoriser le code dans `index.js` (que nous avons désassocié de `index.html`). Une fois que tu auras terminé de refactoriser, tu pourras supprimer `index.js` car tout le JS sera dans notre contrôleur. Bonne chance !

### 1. Connecter le contrôleur au DOM

Nous utiliserons un seul contrôleur Stimulus pour tout l'exercice, donc tu dois sélectionner un élément HTML (un `<div>` ou autre) qui a accès aux deux listes et aux formulaires qu'il contient.

```html
<!-- index.html -->

<div data-controller="gifts">
  <!-- [...] -->
</div>
```

### 2. Ajouter un élément via le formulaire de cadeaux

#### 2.1. Transformer les champs de saisie en data-targets

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

#### 2.2. Ajouter un data-action au formulaire

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

#### 2.1. Transformer la liste en data-target

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

#### 2.2. Créer la fonction `toggleStrike` et finaliser la fonction `addItemViaForm`

Avec StimulusJS, nous pouvons ajouter l''écouteur d'événement' qui basculera la présence de la classe `.strike` directement sur l'élément `<li>` lorsque nous le créons, ce qui simplifie grandement notre travail.

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

Et voilà pour le premier formulaire !

### 2. Ajouter un élément via le formulaire d'idées

#### 2.1. Transformer le champ de saisie du formulaire d'idées en data-target

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

#### 2.2. Transformer la liste d'idées en data-target

```html
<!-- index.html -->

<ul class="search-list"
    data-gifts-target="ideasList">
</ul>
```

```js
// controllers/gifts_controller.js

export default class extends Controller {
  static targets = ["nameInput", "priceInput", "list", "ideasInput", "ideasList"]

  // [...]
}
```

#### 2.3. Ajouter un data-action au formulaire d'idées

```html
<!-- index.html -->

<form class="mt-4 search-form"
      data-action="submit->gifts#searchGifts">
    <!-- [...] -->
</form>
```

#### 2.3. Coder la fonction `searchGifts`

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
            <button class="btn btn-info btn-sm ms-2 text-white" data-action="click->gifts#moveItem">Ajouter</button>
          </div>`
          this.ideasListTarget.insertAdjacentHTML('beforeend', listItem)
        })
      });
  }
}
```

#### 2.3. Coder la fonction `moveItem`

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
