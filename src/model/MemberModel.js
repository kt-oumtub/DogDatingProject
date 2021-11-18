import LoginModel from './LoginModel';

export default class MemberModel extends LoginModel {
  constructor(
    memberId,
    name,
    email,
    address,
    tel,
    birthday,
    memberImg,
    username, //extends from LoginModel
    password, //extends from LoginModel
  ) {
    super(username, password); //extends from LoginModel
    this.memberId = memberId;
    this.name = name;
    this.email = email;
    this.address = address;
    this.tel = tel;
    this.birthday = birthday;
    this.memberImg = memberImg;
  }
}
