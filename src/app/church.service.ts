import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";

@Injectable({
  providedIn: "root",
})
export class ChurchService {
  constructor(private http: HTTP) {}

  savemember(member: any) {
    var url = "https://churchbackend.sharedwithexpose.com/api/churchservice";

    return this.http.post(url, member, {});
  }
}
