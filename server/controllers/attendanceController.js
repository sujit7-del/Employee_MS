import Attendance from '../models/Attendance.js'
import Employee from '../models/Employee.js'

const getAttendance = async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0]

        const attendance = await Attendance.find({date}).populate({
            path: "employeeId", 
            populate: [
                "department",
                "userId"
            ] 
        })
        res.status(200).json({success: true, attendance})
    } catch(error) {
        res.status(500).json({success:false , message: error.message})
    }

}

const updateAttendance = async (req, res) => {
    try {
        const {employeeId} = req.params
        const {status} = req.body
        
        if (!employeeId) {
            return res.status(400).json({success: false, message: 'Employee ID is required'})
        }
        
        if (!status) {
            return res.status(400).json({success: false, message: 'Status is required'})
        }

        const date = new Date().toISOString().split('T')[0]
        const employee = await Employee.findOne({employeeId})
            .catch(err => {
                console.error('Database query error:', err)
                return null
            })

        if (!employee) {
            return res.status(404).json({success: false, message: 'Employee not found'})
        }

        const validStatuses = ['Present', 'Absent', 'Sick', 'Leave']
        const normalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
        
        if (!validStatuses.includes(normalizedStatus)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
            })
        }

        const attendance = await Attendance.findOneAndUpdate(
            {employeeId: employee._id, date},
            {status: normalizedStatus},
            {new: true, runValidators: true}
        ).catch(err => {
            console.error('Attendance update error:', err)
            return null
        })

        if (!attendance) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update attendance'
            })
        }

        res.status(200).json({success: true, attendance})
    } catch(error) {
        console.error('Attendance controller error:', error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

const attendanceReport = async (req, res) => {
    try {
        const {date, limit = 5, skip = 0 } = req.query;
        const query = {};

        if(date) {
            query.date = date;
        }

        const attendanceData = await Attendance.find(query)
        .populate({
            path: "employeeId", 
            populate: [
                "department",
                "userId"
            ] 
        }).sort({date: -1}).skip(parseInt(skip)).limit(parseInt(limit))

        const groupData = attendanceData.reduce((result, record) => {
            if(!result[record.date]) {
                result[record.date] = []
            }
            result[record.date].push({
                employeeId: record.employeeId.employeeId,
                employeeName: record.employeeId.userId.name,
                departmentName: record.employeeId.department.dep_name,
                status: record.status || "Not Marked"
            })
            return result;
        }, {})
        return res.status(201).json({success: true, groupData})
    } catch(error) {
        res.status(500).json({success:false , message: error.message})
    }
}


export {getAttendance, updateAttendance, attendanceReport}