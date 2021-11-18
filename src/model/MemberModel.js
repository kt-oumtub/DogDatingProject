import LoginModel from './LoginModel';

export default class MemberModel extends LoginModel {
  constructor(
    username, //extends from LoginModel
    password, //extends from LoginModel
    memberId,
    name,
    gender,
    email,
    address,
    tel,
    birthday,
    memberImg,
  ) {
    super(username, password); //extends from LoginModel
    this.memberId = memberId;
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.address = address;
    this.tel = tel;
    this.birthday = birthday;
    this.memberImg = memberImg;
  }
}
