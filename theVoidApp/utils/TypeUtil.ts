import { FirebaseTime } from "../classes/FirebaseTime";

export class TypeUtil {
  public static getMillis = (firebaseTime: FirebaseTime): number => {
    return firebaseTime.seconds * 1000;
  };

  public static getDate = (firebaseTime: FirebaseTime): Date => {
    return firebaseTime ? new Date(TypeUtil.getMillis(firebaseTime)) : new Date();
  };
}
