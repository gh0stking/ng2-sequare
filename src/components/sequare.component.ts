import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * 九宫格组件
 * 
 * @seq-rows
 *      --description:行数
 *      --demo:[seq-rows]="5"
 *      --note:大于0的整数
 * 
 * @seq-cols
 *      --description:列数
 *      --demo:[seq-cols]="5"
 *      --note:大于0的整数
 * 
 * @seq-data
 *      --description:包含数据的格子
 *      --demo:[seq-data]="[{ID:1,X:1,Y:2},{ID:2,X:3,Y:3}]"
 *      --note:每个数据中必须包含id,x,y属性，其中x,y属性用于指定此单元格的位置(id可以是数字或字符串，x和y是整数，从0开始计算)
 * 
 * @seq-box-size
 *      --description:格子大小
 *      --demo:[seq-size]="50"
 *      --note:大于0的整数
 * 
 * @seq-box-color
 *      --description:格子颜色
 *      --demo:[seq-color]="'#F06060'"
 *      --note:16进制颜色值
 * 
 * @seqBoxSelectedEvent 
 *      --description:选中格子事件
 *      --demo:(seqBoxSelectedEvent)="boxSelected($event)"
 *      --note:$event中包含了点击格子事件返回的参数，
 *              如 : boxSelected(args):void{ console.log(args); }
 * 
 */
@Component({
    selector: 'sequare',
    template: `
        <div *ngFor='let row of sequare' [style.width.px]='getSequareWidth()'>
            <span *ngFor='let box of row.Boxes' 
                class='seq-box' 
                [style.width.px]='seqBoxSize' 
                [style.height.px]='seqBoxSize' 
                [style.background-color]='box.isCurrent?selectedColor:seqBoxColor'
                [class.seq-box-hasdata]='box.hasData && !box.isHovered && !box.isCurrent' 
                [class.seq-box-hovered]='box.isHovered' 
                (mouseover)='box.isHovered=true'
                (mouseout)='box.isHovered=false' 
                (click)='changeCurrentBox(box)'>
            </span>
        </div>
    `,
    styles: [`
        .seq-box{
            display: block;
            float: left;
            border-radius: 10px;
            cursor: pointer;
            border: 5px solid #ddd;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
        .seq-box-hovered{
            background-color:#8AEFBC!important;
        }
        .seq-box-hasdata{
            background-color:#6191C6!important;
        }
    `]
})
export class SequareComponent implements OnInit {
    @Input("seq-rows") seqRows: number = 5;
    @Input("seq-cols") seqCols: number = 5;
    @Input("seq-data") seqData: Array<any>;
    @Input("seq-box-size") seqBoxSize: number = 50;
    @Input("seq-box-color") seqBoxColor: string = "#F06060";
    @Output("seqBoxSelectedEvent") seqBoxSelectedEvent: EventEmitter<any> = new EventEmitter<any>();
    private selectedColor: string = "#8AEFBC";
    private sequare: Array<SeqRow> = new Array<SeqRow>();

    ngOnInit(): void {
        this.createSequare();
    }

    private createSequare(): void {
        if (this.seqRows > 0 && this.seqCols > 0) {
            for (let x = 0; x < this.seqRows; x++) {
                let row = new SeqRow();
                row.Boxes = new Array<SeqBox>();
                for (let y = 0; y < this.seqCols; y++) {
                    let box = new SeqBox();
                    box.X = x;
                    box.Y = y;
                    if (this.seqData && this.seqData.length > 0) {
                        let data = this.seqData.find(a => a.X == x && a.Y == y);
                        if (data) {
                            box.ID = data.ID;
                            box.hasData = true;
                        }
                    }
                    row.Boxes.push(box);
                }
                this.sequare.push(row);
            }
        }
    }

    private getSequareWidth(): number {
        let width = this.seqCols * this.seqBoxSize + (this.seqCols - 1) * 5 + 5 * 2;
        return width;
    }

    private changeCurrentBox(box: SeqBox): void {
        box.isCurrent = true;
        this.seqBoxSelectedEvent.emit(box);
        this.sequare.forEach((r, x) => {
            r.Boxes.forEach((b, y) => {
                if (b.X == box.X && b.Y == box.Y) {
                    b.isCurrent = true;
                } else {
                    b.isCurrent = false;
                }
            });
        });
    }


}


export class SeqRow {
    Boxes: Array<SeqBox>;
}

export class SeqBox {
    ID: any;
    X: number;
    Y: number;
    isHovered: boolean;
    hasData: boolean;
    isCurrent: boolean;
}