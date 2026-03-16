import { Router } from "express";
import {
  createBranch,
  deleteBranch,
  getBranches,
  getSingleBranch,
  // updateBranch,
} from "../controllers/branch.controller.js";

const branch_router = Router();

branch_router.get("/", getBranches);
branch_router.post("/", createBranch);
branch_router.get("/:id", getSingleBranch);
// branch_router.patch("/:id", updateBranch);
branch_router.delete("/:id", deleteBranch);

{
  /*auth.controller.js
  register

login

logout

refreshToken

forgotPassword

resetPassword

2️⃣ branch.controller.js
createBranch → Admin creates a new branch

getBranches → Get all branches

getBranchById → View one branch

updateBranch → Edit branch details

deleteBranch → Remove a branch

3️⃣ queue.controller.js
createQueue

getQueues

getQueueById

getQueuesByBranch

updateQueue

deleteQueue

Optional:

activateQueue

deactivateQueue

4️⃣ ticket.controller.js
createTicket → Customer takes a ticket

getUserActiveTicket → Check if user already has one

getUserTickets → Ticket history

Queue actions:

getQueueTickets

getWaitingTickets

Staff actions:

callNextTicket

serveTicket

skipTicket

cancelTicket

Analytics helpers:

getTicketStats

5️⃣ user.controller.js
getUsers

getUserById

updateUser

deleteUser

Admin-only:

createStaffUser

changeUserRole

staff.controller.js
assignQueueToStaff

getStaffQueue

getCurrentServingTicket

getStaffTickets

updateStaffStatus

7️⃣ Analytics Controller (Admin)

For dashboard statistics.

Controller File

controllers/analytics.controller.js

Functions

getBranchStats

getQueueStats

getTicketStats

getDailyTicketReport

getAverageWaitTime*/
}

export default branch_router;
