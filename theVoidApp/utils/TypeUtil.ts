import { FirebaseTime } from "../classes/FirebaseTime";

export class TypeUtil {
  public static getMillis = (firebaseTime: FirebaseTime): number => {
    return firebaseTime.seconds * 1000 + firebaseTime.nanoseconds;
  };

  public static getDate = (firebaseTime: FirebaseTime): Date => {
    return new Date(TypeUtil.getMillis(firebaseTime));
  };
}
