import { Component } from '@angular/core';

@Component({
  selector: 'app-file-rule-validation',
  templateUrl: './file-rule-validation.component.html',
  styleUrls: ['./file-rule-validation.component.css']
})
export class FileRuleValidationComponent {
  names = ['CheckFileName', 'CheckRecordCount', 'CheckDelimiter'];
  actions = ['pass', 'drop'];
  selectedName = '';
  selectedAction = '';
  
  dynamicRows:any = [];

  ruleSetData: any = {
    "RuleSet": [{

      "name": "CheckFileName",
      "match": {
        "regex": "str"
      },
      "Action": "pass"
    },{
      "name": "CheckRecordCount",
      "match": {
        "gt": "500",
        "lt": "1"
      },
      "Action": "pass"
    }, {
      "name": "CheckDelimiter",
      "match": "|",
      "Action": "drop"
    }]
  };

  constructor(){
    let nestedObjects = {};
    let nestedString = {};
    this.ruleSetData.RuleSet.forEach((e:any)=>{
      if(typeof (e.match) == 'object'){
        nestedObjects = e.match;
      } else if(typeof(e.match) == 'string'){
        nestedString = e.match;
      }
    });

    this.nestedObjects(this.ruleSetData);
    console.log("nestedObjects", nestedObjects, nestedString)
  }

  nestedObjects(obj:any){
    const iterate = (obj:any) => {
      const stack = [obj];
      while (stack?.length > 0) {
        const currentObj = stack.pop();
        Object.keys(currentObj).forEach(key => {
          console.log(`key: ${key}, value: ${currentObj[key]}`);
          if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
            stack.push(currentObj[key]);
          }
        });
      }
    };
    console.log('nested objects ', iterate)
  }

  addNewField(){
    this.dynamicRows.push({
      "name": ""
    })
  }
}
// "name": "",
// "match": {
//   "regex": ""
// },
// "Action": ""