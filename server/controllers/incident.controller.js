import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import Incident from "../models/incident.model.js";
import { uploadOnCloudinary } from "../config/Cloudinary.js";
import { analyzeIncidentSeverity } from "../utils/GeminiService.js";

const createIncident = asyncHandler(async (req, res) => {
    const { title, description, assignedTo } = req.body;
    const reportedBy = req.user._id;

    if (!title || !description) {
        throw new ApiError(400, "Title and Description are required");
    };

    const filePath = req.file ? req.file.path : null;
    if(!filePath){
        throw new ApiError(400, "Image file is required");
    };

    const uploadedImage = await uploadOnCloudinary(filePath);
    if(!uploadedImage){
        throw new ApiError(500, "Image upload failed");
    };

    const severity = await analyzeIncidentSeverity(filePath);
    const incident = await Incident.create({
        title,
        description,
        reportedBy,
        ...(uploadedImage && {imageUrl : uploadedImage.url}),
        assignedTo,
        severity
    });
    if (!incident) {
        throw new ApiError(500, "Failed to create incident");
    }
    res
    .status(201)
    .json(new ApiResponse(201,incident, "Incident created successfully"));
});

const changeIncidentStatus = asyncHandler(async (req, res) => {
    const { incidentId } = req.params;
    const { status } = req.body;
    if (!status) {
        throw new ApiError(400, "Status is required");
    }   
    const incident = await Incident.findById(incidentId);
    if (!incident) {
        throw new ApiError(404, "Incident not found");
    }   
    incident.status = status;
    await incident.save();
    res
    .status(200)
    .json(new ApiResponse(200, "Incident status updated successfully", incident));
});

export { createIncident, changeIncidentStatus };
