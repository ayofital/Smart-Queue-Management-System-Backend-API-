import Branch from "../models/branch.model.js";

export const createBranch = async (req, res, next) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      return res
        .status(400)
        .json({ message: "Name and location are required" });
    }

    const branch = await Branch.create({ name, location });

    res
      .status(201)
      .json({ message: "Branch created successfully", data: branch });
  } catch (error) {
    next(error);
  }
};

export const getAllBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find({ isActive: true }).sort({
      createdAt: -1,
    });

    // if (!branches || branches.length === 0) {
    //   const error = new Error("No branch found.");
    //   error.statusCode = 404;
    //   return next(error);
    // }

    res.status(200).json({ count: branches.length, data: branches });
  } catch (error) {
    next(error);
  }
};

export const getSingleBranch = async (req, res, next) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findById(id);

    if (!branch) {
      const error = new Error("Branch not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ data: branch });
  } catch (error) {
    next(error);
  }
};

// export const updateBranch = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     // const {}
//     const branch = await Branch.findByIdAndUpdate(id, req.body, { new: true });

//     if (!branch) {
//       const error = new Error("Branch not found");
//       error.statusCode = 404;
//       return next(error);
//     }

//     res.status(200).json({ data: branch });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteBranch = async (req, res, next) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findById(id);

    if (!branch) {
      const error = new Error("Branch not found");
      error.statusCode = 404;
      return next(error);
    }

    await branch.deleteOne();

    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    next(error);
  }
};
