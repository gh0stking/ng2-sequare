# 使用示例：
```
1.component中引入SequareComponent组件
import {SequareComponent} from '../components/sequare';
2.html页面中使用sequare
<sequare 
    [seq-rows]="5" 
    [seq-cols]="6" 
    [seq-data]="[{ID:1,X:1,Y:1},{ID:2,X:2,Y:3}]" 
    [seq-box-size]="70" 
    [seq-box-color]="'#F06060'" 
    (seqBoxSelectedEvent)="boxSelected($event)">
</sequare>
```

# 参数说明：
```
seq-rows
    --description:行数
    --demo:[seq-rows]="5"
    --note:大于0的整数

seq-cols
    --description:列数
    --demo:[seq-cols]="5"
    --note:大于0的整数

seq-data
    --description:包含数据的格子
    --demo:[seq-data]="[{ID:1,X:1,Y:2},{ID:2,X:3,Y:3}]"
    --note:每个数据中必须包含id,x,y属性，其中x,y属性用于指定此单元格的位置(id可以是数字或字符串，x和y是整数，从0开始计算)

seq-box-size
    --description:格子大小
    --demo:[seq-size]="50"
    --note:大于0的整数

seq-box-color
    --description:格子颜色
    --demo:[seq-color]="'#F06060'"
    --note:16进制颜色值

seqBoxSelectedEvent 选中格子事件
    --description:选中格子事件
    --demo:(seqBoxSelectedEvent)="boxSelected($event)"
    --note:$event中包含了点击格子事件返回的参数，如：
            boxSelected(args):void{ 
                console.log(args); 
            }
```