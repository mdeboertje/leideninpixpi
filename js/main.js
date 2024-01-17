document.addEventListener("DOMContentLoaded", function () {
  const elements = {
    openBtn: document.getElementById("openEventModalBtn"),
    closeBtn: document.getElementById("closeEventModalBtn"),
    saveBtn: document.getElementById("saveEventBtn"),
    modal: document.getElementById("eventModal"),
    form: document.getElementById("eventForm"),
    timeline: document.getElementById("eventTimeline"),
    noEventsMsg: document.getElementById("noEventsMessage"),
    mainContent: document.getElementById("mainContent"),
  };

  const storedEventData = localStorage.getItem("eventData");
  const eventTimelineData = storedEventData ? JSON.parse(storedEventData) : [];

  const saveToJsonFile = () => {
    const jsonData = JSON.stringify(eventTimelineData);
    localStorage.setItem("eventData", jsonData);
  };

  const createEventItem = (date, title, desc) => {
    const item = document.createElement("li");
    item.classList.add("event");
    item.innerHTML = `<strong>${date}</strong>: ${title}`;
    item.addEventListener("click", () =>
      displayEventDetails(date, title, desc)
    );
    elements.timeline.appendChild(item);
  };

  const buildEventDetailsHTML = (date, title, desc) => `
    <div class="event-details">
      <p><strong>Date:</strong> ${date}</p>
      <h2>${title}</h2>
      <p>${desc}</p>
    </div>`;

  const updateNoEventsVisibility = () => {
    elements.noEventsMsg.style.display =
      eventTimelineData.length === 0 ? "block" : "none";
    elements.noEventsMsg.classList.toggle(
      "visible",
      eventTimelineData.length === 0
    );
  };

  const displayEventDetails = (date, title, desc) => {
    const currentDetails = elements.mainContent.querySelector(".event-details");
    currentDetails?.remove();

    const newDetails = buildEventDetailsHTML(date, title, desc);
    elements.mainContent.insertAdjacentHTML("beforeend", newDetails);
  };

  const saveEvent = () => {
    const date = document.getElementById("eventDate").value;
    const title = document.getElementById("eventTitle").value;
    const desc = document.getElementById("eventDescription").value;

    if (date && title && desc) {
      const newEvent = { date, title, desc };
      eventTimelineData.push(newEvent);
      createEventItem(newEvent.date, newEvent.title, newEvent.desc);

      // Save to local storage
      saveToJsonFile();

      elements.modal.style.display = "none";
      updateNoEventsVisibility();
    }

    elements.form.reset();
  };

  const loadStoredData = () => {
    eventTimelineData.forEach((event) => {
      createEventItem(event.date, event.title, event.desc);
    });

    updateNoEventsVisibility();
  };

  const setupEventListeners = () => {
    elements.openBtn.addEventListener(
      "click",
      () => (elements.modal.style.display = "block")
    );
    elements.closeBtn.addEventListener(
      "click",
      () => (elements.modal.style.display = "none")
    );
    elements.saveBtn.addEventListener("click", saveEvent);
  };

  // Initialize the component
  const init = () => {
    loadStoredData();
    setupEventListeners();
  };

  // Run the initialization
  init();
});
