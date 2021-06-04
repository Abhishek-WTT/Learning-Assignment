import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';

interface JSONDATA {
   
  name: string;
  
  // type: string;
  //ppu: number;
  children?: JSONDATA[];
}
interface Data {
  expandable: boolean;
  
  name: string;
  // id: string;
  // type: string;
  level: number;
}
const TREE_DATA : JSONDATA[] = [  ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TreeForm';
  jsonData : any ;
   obj:any={}

  private _transformer = (node: JSONDATA, level: number) => {
      return {
        expandable:!!node.children && node.children.length > 0,
        name: node.name,
         
        // type:node.type,
        level: level,
      };
    }
  
    treeControl = new FlatTreeControl <Data>(
        node => node.level, node => node.expandable);
  
    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);
  
    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
    constructor(private http: HttpClient) {    }
  
    hasChild = (_: number, node: Data) => node.expandable;
  ngOnInit(): void {

    this.http.get("assets/data.json").subscribe(data=>{
      this.jsonData = data;
      console.log(this.jsonData);
      this.jsonData = data;
      console.log(this.jsonData);
       this.jsonData.forEach((element: any) => {
      this.obj = {
        name: element.name,
       
        children: [
          {
            name: element.name,
            children: element.children
          }
        ]
      }
      TREE_DATA.push(this.obj);
      })
      // this.dataSource.data = TREE_DATA;
      this.dataSource.data = this.testCase(TREE_DATA) 
      
    })
    console.log(TREE_DATA);
  }


  //Test Case :  Json file is empty or not
  testCase(value:any) {
      if(!value) {
        console.log('json file is empty');
        
      }else {
        console.log(value);
        return value;
      }
    }
   
    
    // Test Case: To check Json is valid or not 

    //  testCase(val:any){
    //    if(val instanceof Array || val instanceof Object) {
    //      console.log("json is valid");
    //      return val;
    //    }else {
    //      console.log("json is not valid");
    //    }
    // }
  

    // Test Case : To check whether json has nested object or not.
    // testCase(value:any) {
    //   for(let v of value){
    //     if(v.children) {
    //       console.log('json file is nested');
    //       return value;
    //     }else {
    //       console.log('json file is not nested'+value);
    //     }
    //   }
    // }
}
