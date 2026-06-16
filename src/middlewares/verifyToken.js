import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    console.log(req.headers);
    const headers = req.headers["authorization"]

    if (!headers || !headers.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = headers.split(" ")[1]

    let decoded;
    const jwtSecretKey = process.env.JWT_SECRET
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}