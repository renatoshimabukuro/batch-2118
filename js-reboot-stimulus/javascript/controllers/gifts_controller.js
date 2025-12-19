import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["name", "price", "list"];

  addGiftItem(event) {
    event.preventDefault();

    // Set name and price input as targets
    // Console log the values in those input
    const name = this.nameTarget.value;
    const price = this.priceTarget.value;

    const li = document.createElement("li");
    li.textContent = `${name} - $${price}`;

    // <li data-action="click->gifts#check">
    li.setAttribute("data-action", "click->gifts#check");

    // append to the list
    this.listTarget.appendChild(li);

    this.nameTarget.value = "";
    this.priceTarget.value = "";
  }

  check(event) {
    event.currentTarget.classList.toggle("strike");
  }
}
