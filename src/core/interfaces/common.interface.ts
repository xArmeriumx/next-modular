/**
 * ServiceResponse<T>
 * 
 * นี่คือหน้าตามาตรฐาน (Contract) ของข้อมูลทุกอย่างที่จะถูกส่งออกมาจากแฟ้ม Service ของเรา
 * การใช้ Generic <T> ทำให้เราสามารถเอาโครงสร้างนี้ไปห่อหุ้มข้อมูลอะไรก็ได้
 * เช่น ServiceResponse<Product[]>, ServiceResponse<User>, ServiceResponse<Cart>
 */
export interface ServiceResponse<T> {
  success: boolean;       // ระบุว่าการทำงานสำเร็จหรือไม่
  data?: T;               // ข้อมูลหลักที่จะส่งกลับ (ถ้า success เป็น true มักจะมีค่านี้)
  error?: string;         // ข้อความแจ้งเหตุผล (ถ้า success เป็น false จะบอกว่าทำไม)
  metadata?: {            // ข้อมูลประกอบอื่นๆ
    total?: number;
    cached?: boolean;
    [key: string]: any;   // ยืดหยุ่นให้ใส่ค่าอื่นๆ ได้
  };
}
