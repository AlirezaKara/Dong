new Vue({
  el: '#app',
  data: {
    allNames: [
      {"id":"1", "name":"بابک", "phone":"09121111111"},
      {"id":"2", "name":"محمد", "phone":"09122222222"},
      {"id":"3", "name":"سعید", "phone":"09123333333"},
      {"id":"4", "name":"علیرضا", "phone":"09124444444"},
    ],
    keys: [],
    users: [],
    user: {
      names: [],
      description: "",
      location: ""
    },
    subusers: [],
    subuser: {
      name: "",
      price: Number,
      pricePl: Number,
    },
    Amount: {
      total: Number,
      mine: Number,
      minePl: Number,
      others: Number,
      othersDiv: Number,
    },
    allPricePl: 0,
    bUsers: [],
    bUser: {
      name: "",
      pay: Number,
      personalCost: Number,
      cost: 0,
    },
    allPay: 0,
    allPcost: 0,
    payDiv: 0,
    optionValue: "0",
  },
  methods: {
    adding() {
      this.users.push({
        'names': this.subusers,
        'description': this.user.description,
        'location': this.user.location
      });
      this.Amount.total = Number;
      this.Amount.mine = Number;
      this.Amount.others = Number;
      this.Amount.othersDiv = Number;
      this.user.location = "";
      this.user.description = "";
      this.subusers = [];
    },
    addNewUser() {
      if (this.subuser.name != "") {
        this.subusers.push({
          "name": this.subuser.name
        });
        this.subuser.name = "";
      }
      this.Amount.othersDiv = parseFloat(this.Amount.total) / parseFloat((this.subusers.length) + 1);
      for (let i = 0; i < this.subusers.length; i++) {
        this.subusers[i].price = this.Amount.othersDiv;
      }
      var temp = this.subusers;
      this.subusers = [];
      this.subusers = temp;
      this.Amount.mine = this.Amount.othersDiv;
    },
    personal() {
      for (let i = 0; i < this.subusers.length; i++) {
        this.allPricePl = parseFloat(this.allPricePl) + parseFloat(this.subusers[i].pricePl);
        console.log(this.allPricePl)
      }
      this.Amount.othersDiv = (parseFloat(this.Amount.total) - (parseFloat(this.Amount.minePl) + parseFloat(this.allPricePl))) / parseFloat((this.subusers.length) + 1);
      for (let i = 0; i < this.subusers.length; i++) {
        this.subusers[i].price = this.Amount.othersDiv;
      }
      for (let i = 0; i < this.subusers.length; i++) {
        this.subusers[i].price = parseFloat(this.subusers[i].price) + parseFloat(this.subusers[i].pricePl);
      }
      var tem = this.subusers;
      this.subusers = [];
      this.subusers = tem;
      this.Amount.mine = parseFloat(this.Amount.othersDiv) + parseFloat(this.Amount.minePl);
    },
    clear() {
      this.Amount.total = Number;
      this.Amount.mine = Number;
      this.Amount.others = Number;
      this.Amount.othersDiv = Number;
      this.user.location = "";
      this.user.description = "";
      this.subusers = [];
      this.subuser.name = "";
    },
    addUser() {
      console.log(this.optionValue)
      if (this.bUser.name != "") {
        this.bUsers.push({
          "name": this.bUser.name,
          "pay": this.bUser.pay,
          "personalCost": this.bUser.personalCost,
        });
      }else if (this.bUser.name == "" && this.optionValue != "0"){
        for (let i = 0; i < this.allNames.length; i++) {
         if (this.optionValue == this.allNames[i].id) {
              this.bUsers.push({
              "name": this.allNames[i].name,
              "pay": this.bUser.pay,
              "personalCost": this.bUser.personalCost,
            });
          }
        }
      }
        this.bUser.name = "";
        this.bUser.pay = Number;
        this.bUser.personalCost = Number;
        this.optionValue = "0";
    },
    bCount() {
      this.allPay = 0;
      this.allPcost = 0;
      this.payDiv = 0;
      for (let i = 0; i < this.bUsers.length; i++) {
        this.allPay = parseFloat(this.allPay) + parseFloat(this.bUsers[i].pay);
        this.allPcost = parseFloat(this.allPcost) + parseFloat(this.bUsers[i].personalCost);
      };
      this.payDiv = ((parseFloat(this.allPay) - parseFloat(this.allPcost)) / parseFloat(this.bUsers.length));
      for (let i = 0; i < this.bUsers.length; i++) {
        this.bUsers[i].cost = (parseFloat(this.bUsers[i].pay) - (parseFloat(this.payDiv) + parseFloat(this.bUsers[i].personalCost))).toFixed(1);
      };
      var temp = this.bUsers;
      this.bUsers = [];
      this.bUsers = temp;
    },
    textColor(value) {
      if (value > 0) {
        return "green";
      } else {
        return "red";
      }
    },
    editInput: function (event, index, type) {
      if (type == 'name')
        this.bUsers[index].name = event.target.value;
      else if (type == 'pay')
        this.bUsers[index].pay = event.target.value;
      else if (type == 'personalCost')
        this.bUsers[index].personalCost = event.target.value;
    },
    deleteRow(index) {
      this.$delete(this.bUsers, index)
    },
    bAdding() {
      this.users.push({
        'names': this.bUsers,
        'description': this.user.description,
        'location': this.user.location,
        'costs': this.bUsers.cost, 
      });
      this.user.location = "";
      this.user.description = "";
      this.bUsers = [];
      console.log(this.users);
    }
  }
});


