import { Component, OnInit } from '@angular/core';
import {ParentService} from "../share/parent.service";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  /**
   * 父组件数据
   * @type {[string , string , string]}
   */
  public parentData = ['来自父组件数据a', '来自父组件数据b', '来自父组件数据c'];
  /**
   * 存储来自子组件数据
   * @type {Array}
   */
  public dataFromChild = [];
  public nextData = 0;
  constructor(private parentService: ParentService) {
    parentService.childToParent$.subscribe(data => {
      this.dataFromChild.push(`${data}`);
    });
  }

  ngOnInit() {
  }

  /**
   * 发射数据到子组件
   */
  public emissionDataToChild() {
    const toChildData = this.parentData[this.nextData++];
    this.parentService.parentToChild(toChildData);
    if (this.nextData >= this.parentData.length) { this.nextData = 0; }
  }

}

