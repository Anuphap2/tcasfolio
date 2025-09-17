import { z } from "zod";

export const infoSchema = z.object({
    fnameTH: z.string().min(1, "กรุณากรอกชื่อจริงภาษาไทย"),
    lnameTH: z.string().min(1, "กรุณากรอกนามสกุลภาษาไทย"),
    fnameEN: z.string().min(1, "กรุณากรอกชื่อจริงภาษาอังกฤษ"),
    lnameEN: z.string().min(1, "กรุณากรอกนามสกุลอังกฤษ"),
    idCard: z
        .string()
        .min(13, "กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก")
        .max(13, "กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก"),
    birthDate: z.string().min(1, "กรุณากรอกวันเกิด"),
    email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
    tel: z.string().min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก").max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก"),

    gender: z.string().min(1, "กรุณาเลือกเพศ"),
    address: z.string().min(1, "กรุณากรอกที่อยู่"),
    oldSchool: z.string().min(1, "กรุณากรอกโรงเรียนเดิม"),
    skill: z.string().min(1, "กรุณากรอกความสามารถ"),
    reason: z.string().min(1, "กรุณากรอกเหตุผล"),
    faculty: z.string().min(1, "กรุณากรอกคณะ"),
    department: z.string().min(1, "กรุณากรอกสาขา"),
    university: z.string().min(1, "กรุณากรอกมหาวิทยาลัย"),

    // แก้ไขให้เป็น array ทั้งหมดเพื่อ match กับ form
    imgSrc: z.array(z.string().url("รูปแบบ URL ของรูปภาพไม่ถูกต้อง")).min(1, "กรุณาอัปโหลดรูปภาพโปรไฟล์อย่างน้อย 1 รูป"),
    imgActivity: z.array(z.string().url("รูปแบบ URL ของรูปภาพกิจกรรมไม่ถูกต้อง")).optional(),
    imgAward: z.array(z.string().url("รูปแบบ URL ของรูปภาพรางวัลไม่ถูกต้อง")).optional(),

    weight: z.coerce
        .number({
            message: "กรุณากรอกน้ำหนักเป็นตัวเลข"
        })
        .min(1, "กรุณากรอกน้ำหนักให้ถูกต้อง")
        .max(300, "กรุณากรอกน้ำหนักไม่เกิน 300 กิโลกรัม"),
    height: z.coerce
        .number({
            message: "กรุณากรอกส่วนสูงเป็นตัวเลข"
        })
        .min(1, "กรุณากรอกส่วนสูงให้ถูกต้อง")
        .max(250, "กรุณากรอกส่วนสูงไม่เกิน 250 เซนติเมตร"),
    gpa: z.coerce
        .number({
            message: "กรุณากรอกเกรดเฉลี่ยเป็นตัวเลข"
        })
        .min(1, "เกรดเฉลี่ยต้องไม่ต่ำกว่า 1.00")
        .max(4, "เกรดเฉลี่ยต้องไม่เกิน 4.00"),
});
