const cardContainer = document.getElementById("card-container");
const statusEl = document.getElementById("modal-status");
const priorityEl = document.getElementById("modal-priority");
const issueDetailsModal = document.getElementById("issue_details_modal");
let allIssues = [];

document.getElementById("allBtn").addEventListener("click", () => {
  displayIssue(allIssues);
});

document.getElementById("openBtn").addEventListener("click", () => {
  const filtered = allIssues.filter((issue) => issue.status === "open");
  displayIssue(filtered);
});

document.getElementById("closeBtn").addEventListener("click", () => {
  const filtered = allIssues.filter((issue) => issue.status === "closed");
  displayIssue(filtered);
});

function handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (username === "admin" && password === "admin123") {
    errorMsg.classList.add("hidden");
    window.location.href = "main.html";
  } else {
    errorMsg.classList.remove("hidden");
  }
}

const loadIssue = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allIssues = data.data;
  displayIssue(allIssues);
};

const displayIssue = (issues) => {
    cardContainer.innerHTML = ""; 
    document.getElementById("issue-count").textContent =
      `${issues.length} Issues`;
  issues.forEach((issue) => {
    const card = document.createElement("div");

    // Status condition
    let statusImg, statusText, statusColor;

    if (issue.status === "open") {
      statusImg = "./assets/Open-Status.png";
      statusText = "Open";
      statusColor = "text-[#00A96E]";
    } else {
      statusImg = "./assets/Closed- Status .png";
      statusText = "Closed";
      statusColor = "text-[#E5534B]";
    }

    // Priority condition
    let priorityColor;

    if (issue.priority === "high") {
      priorityColor = "border-red-500 text-red-500";
    } else if (issue.priority === "medium") {
      priorityColor = "border-yellow-500 text-yellow-500";
    } else {
      priorityColor = "border-green-500 text-green-500";
    }

    card.innerHTML = `
      <div  onclick="openModal(${issue.id})"  class="card bg-white shadow-sm border border-gray-200 p-5 rounded-xl hover:shadow-md transition-all flex flex-col justify-between">
          <div>
              <div class="flex items-center justify-between mb-3">
                  <span class="bg-white text-sm font-bold px-2 py-1 rounded-full flex items-center gap-1 border ${statusColor}">
                      <img src="${statusImg}" class="w-4 h-4" alt=""> ${statusText}
                  </span>
                  <span class="border text-sm font-bold px-2 py-1 rounded uppercase ${priorityColor}">
                      ${issue.priority}
                  </span>
              </div>

              <h2 class="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                  ${issue.title}
              </h2>

              <p class="text-sm text-gray-500 mb-4 line-clamp-1">
                  ${issue.description}
              </p>

              <div class="flex flex-wrap gap-2 mb-4">
              ${issue.labels
                .map(
                  (label) => `
               <span class="border bg-[#FDE68A] text-black text-sm px-2 py-0.5 rounded-md font-medium">
             ${label}</span>`,
                )
                .join("")}
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 pt-3 mt-auto">
              <div class="flex flex-col gap-2">
                  <p>#${issue.id} by ${issue.author}</p>
                  <p>${issue.assignee || "Unassigned"}</p>
              </div>
              <div class="flex flex-col gap-2 text-right">
                  <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
                  <span>${new Date(issue.updatedAt).toLocaleDateString()}</span>
              </div>
          </div>
      </div>
    `;

    cardContainer.appendChild(card);
  });
};

/* template */
const openTreeModal = async (treeId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/plant/${treeId}`,
  );
  const data = await res.json();
  const plantDetails = data.plants;

  modalTitle.textContent = plantDetails.name;
  modalImage.src = plantDetails.image;
  modalCategory.textContent = plantDetails.category;
  modalDescription.textContent = plantDetails.description; // ✅ was missing
  modalPrice.textContent = plantDetails.price;

  treeDetailsModal.showModal(); // ✅ now works with correct id
};


const openModal = async (issueID) => {
  // console.log(issueID);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueID}`,
  );

  const data = await res.json();
  const issueDetails = data.data;


  if (issueDetails.status === "open") {
    statusEl.className =
      "text-sm font-bold px-2 py-1 rounded-full flex items-center gap-1 border text-[#00A96E]";
    statusEl.innerHTML = `<img src="./assets/Open-Status.png" class="w-4 h-4"> Open`;
  } else {
    statusEl.className =
      "text-sm font-bold px-2 py-1 rounded-full flex items-center gap-1 border text-[#E5534B]";
    statusEl.innerHTML = `<img src="./assets/Closed-Status.png" class="w-4 h-4"> Closed`;
  }

  if (issueDetails.priority === "high") {
    priorityEl.className =
      "border text-sm font-bold px-2 py-1 rounded uppercase border-red-500 text-red-500";
  } else if (issueDetails.priority === "medium") {
    priorityEl.className =
      "border text-sm font-bold px-2 py-1 rounded uppercase border-yellow-500 text-yellow-500";
  } else {
    priorityEl.className =
      "border text-sm font-bold px-2 py-1 rounded uppercase border-green-500 text-green-500";
  }
  priorityEl.textContent = issueDetails.priority;

  // Rest of fields
  document.getElementById("modal-title").textContent = issueDetails.title;
  document.getElementById("modal-description").textContent =
    issueDetails.description;
  document.getElementById("modal-author").textContent = issueDetails.author;
  document.getElementById("modal-assignee").textContent =
    issueDetails.assignee || "Unassigned";
  document.getElementById("modal-created").textContent = new Date(
    issueDetails.createdAt,
  ).toLocaleDateString();
  document.getElementById("modal-updated").textContent = new Date(
    issueDetails.updatedAt,
  ).toLocaleDateString();


  issueDetailsModal.showModal()

};


loadIssue();
