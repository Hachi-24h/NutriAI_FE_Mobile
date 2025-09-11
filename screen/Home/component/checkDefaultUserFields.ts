import { User } from "../../../redux/slice/userSlice";

export function checkDefaultUserFields(user: User | null): string[] {
  if (!user) return ["profile"];

  const missing: string[] = [];

  // Kiểm tra gender
  if (user.gender === "OTHER") {
    missing.push("gender");
  }

  // Kiểm tra height & weight
  if (user.height === "0") {
    missing.push("height");
  }
  if (user.weight === "0") {
    missing.push("weight");
  }

  // DOB có thể để mặc định => không check
  // Avt cũng có thể check nếu bạn muốn yêu cầu user cập nhật avatar
  if (!user.avt) {
    missing.push("avt");
  }

  return missing;
}
