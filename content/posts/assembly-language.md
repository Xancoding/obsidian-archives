---
title: "汇编语言" # 标题
date: 2022-11-15T13:16:12+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- 计算机基础
- 汇编语言
keywords: # 关键词
- Tech
- 计算机基础
- 汇编语言
description: "" # 描述
weight: # 输入1可以顶置文章，用来给文章展示排序，不填就默认按时间排序
slug: ""
draft: false # 是否为草稿
comments: true # 是否展示评论
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: true # 顶部显示当前路径
cover:
    image: "" #图片路径 例：posts/tech/123/picture.png
    caption: "" # 图片底部描述
    alt: ""
    relative: false
---

# 汇编语言是什么？
> **汇编语言是任何一种用于电子计算机、微处理器、微控制器，或其他可编程器件的低级语言**

# 部分知识点 
1. 一个段的起始地址必定是 16 的倍数 -- CS * 10H
2. 一个段的最大长度是 64KB -- IP 寄存器长度为 16 位，$2^{16} = 64$ 
3. A
	- ![image.png](https://bu.dusays.com/2023/04/18/643e9450302b8.png) 
4. D
	- ![image.png](https://bu.dusays.com/2023/04/18/643e9514cc0f9.png)
5. 在汇编源程序中，数据不能以字母开头，所以要在前面加 0，如 0FFF0H
6. 在汇编源程序中，指令 **mov ax, [0]** 被编译器当作指令 **mov ax, 0** 处理
	1. Debug 将 **[idata]** 解释为 一个内存单元
	2. 编译器将 **[idata]** 解释为 **idata**
7. 根据位移进行转换的 汇编指令 方便了程序段在内存中的浮动装配
# DOS 系统中 .EXE 文件中程序的加载过程
![image.png](https://bu.dusays.com/2023/04/18/643ea136bcf84.png)
![image.png](https://bu.dusays.com/2023/04/18/643ea14453a38.png)
# 汇编代码格式
## 1
```
ASSUME CS:CODE, DS:DATA

DATA SEGMENT
  STR1 DB 1, 2, 3, 4
DATA ENDS

CODE SEGMENT
START:


CODE ENDS

END START
```
## 2
```
ASSUME CS:CODE, DS:DATA

DATA SEGMENT
  STR1 DB 1, 2, 3, 4
DATA ENDS

CODE SEGMENT
START:
    ...
    CALL SUB1
    ...
    MOV AX, 4c00H
    INT 21H

; 功能：
; 参数：
; 返回：
SUB1 PROC
    ...
    RET
SUB1 ENDP

CODE ENDS

END START
```
## 3
```
; 调用程序和过程在同一代码段中，则使用NEAR属性
; 调用程序和过程在不同代码段中，则使用FAR属性
; 缺省值为 NEAR
ASSUME CS:CODE, DS:DATA

DATA SEGMENT
  DB 1, 2, 3, 4
DATA ENDS

CODE SEGMENT

MAIN PROC FAR     ; 把主过程看作DOS调用的子进程，定义为FAR属性
    ...
    CALL SUB1     ; 调用子程序SUB1
    ...
    RET           ; 过程返回
MAIN ENDP

SUB1 PROC NEAR    ; 同一代码段调用使用NEAR属性
    ...
    RET           ; 过程返回
SUB1 ENDP         ; 过程结束

CODE ENDS
END MAIN
```
## IF 条件语句的汇编实现框架
```
cmp a, b
jOP true
jmp next
true:
	s1
next:
	...
```
## IF-ELSE 条件语句的汇编实现框架 
```
cmp a, b
jOP true
jmp false

true:
	s1
	jmp next

false:
	s2

next:
	
```
## 程序框架
![image.png](https://bu.dusays.com/2023/04/18/643ea60830801.png)

# 部分知识点
## 指令
### MOV 指令 -- 数据传送指令
- 寄存器、段寄存器、内存单元、立即数
---
1. MOV 寄存器，立即数：MOV AX, 8
2. MOV 寄存器，寄存器：MOV AX, BX
3. MOV 寄存器，内存单元：MOV AX, [0]
4. MOV 寄存器，段寄存器：MOV AX，DS
---
1. ~~MOV 段寄存器，立即数~~  
2. MOV 段寄存器，寄存器：MOV DS, AX
3. MOV 段寄存器，内存单元：MOV DS, [0]（允许，但不建议）
4. ~~MOV 段寄存器，段寄存器~~
---
1. MOV 内存单元，立即数：MOV WORD PTR DS:[0], 1
2. MOV 内存单元，寄存器：MOV [0], BX
3. ~~MOV 内存单元，内存单元~~
4. MOV 内存单元，段寄存器：MOV [0]，DS（允许，但不建议）
---
![image.png](https://bu.dusays.com/2023/04/18/643e95fcf0ea5.png)
### AND 和 OR 指令
![image.png](https://bu.dusays.com/2023/04/19/643f3bf566173.png)
![image.png](https://bu.dusays.com/2023/04/19/643f3c051b5b4.png)
![image.png](https://bu.dusays.com/2023/04/19/643f3c422de8c.png)

### DIV 指令
![image.png](https://bu.dusays.com/2023/04/19/643f37f2224ac.png)
![image.png](https://bu.dusays.com/2023/04/19/643f380d73019.png)

### JMP 指令 -- 无条件转移指令
#### 依据位移进行转移的 JMP 指令
![image.png](https://bu.dusays.com/2023/04/19/643f3eaf0f6fc.png)
![image.png](https://bu.dusays.com/2023/04/19/643f3f99070e3.png)

#### 转移的目的地址在指令中的 JMP 指令
![image.png](https://bu.dusays.com/2023/04/19/643f3f3b832b2.png)
#### 转移的目的地址在寄存器中的 JMP 指令
![image.png](https://bu.dusays.com/2023/04/19/643f4014623e4.png)
#### 转移的目的地址在内存单元中的 JMP 指令
![image.png](https://bu.dusays.com/2023/04/19/643f40b86ebdd.png)
![image.png](https://bu.dusays.com/2023/04/19/643f40d33bb81.png)

#### 总结
- **Label：标号**
1. 段内段转移（8位）（IP）：依据**位移**进行转移的 JMP 指令
2. 段内近转移（16位）（IP）依据**位移**进行转移的 JMP 指令
3. 段内转移（16位）（IP）：转移地址在**寄存器**中的 JMP 指令
4. 段内转移（16位）（IP）：转移地址在**内存**中的 JMP 指令
5. 段间远转移（32位）（CS:IP）：转移的目的地址在**指令**中的 JMP 指令
6. 段间转移（32位）（CS:IP）：转移地址在**内存**中的 JMP 指令
![image.png](https://bu.dusays.com/2023/04/19/643f3ad6b8c50.png)
![5798aee6df9f1b2c11bb9ce45699eba.jpg](https://bu.dusays.com/2023/03/21/641932d706e80.jpg)
### JCXZ 指令 -- 有条件转移指令
![image.png](https://bu.dusays.com/2023/04/19/643f4180d36f8.png)
![image.png](https://bu.dusays.com/2023/04/19/643f41af1bc94.png)
### LOOP 指令 -- 循环指令
![image.png](https://bu.dusays.com/2023/04/19/643f41daf1a0d.png)
![image.png](https://bu.dusays.com/2023/04/19/643f41ee63b73.png)

### CMP 指令 与 标志寄存器
![image.png](https://bu.dusays.com/2023/03/28/64226ba3202ba.png)
![image.png](https://bu.dusays.com/2023/03/28/64226be60d58e.png)
![image.png](https://bu.dusays.com/2023/03/28/64226bfbc0fe5.png)

## 操作符
### DUP
![image.png](https://bu.dusays.com/2023/04/19/643f3867b741f.png)
![image.png](https://bu.dusays.com/2023/04/19/643f387d73b66.png)
### offset 
![image.png](https://bu.dusays.com/2023/04/19/643f39a1ed1db.png)

## 内存单元寻址
- BP默认段前缀为 SS、其他的默认段前缀为 DS
1. 直接寻址：[idata]
2. 寄存器间接寻址：[BX | BP | SI | DI]
3. 寄存器相对寻址：[BX | BP | SI | DI + idata]
4. 基址变址寻址：[BX | BP + SI | DI]
5. 相对基址变址寻址：[BX | BP + SI | DI + idata]

一般来说，我们可以用 [bx+idata+si] 的方式来访问结构体中的数据。用 bx 定位整个结构体，用 idata 定位结构体中的某一个数据项，用 si 定位数据项中的每个元素。为此，汇编语言提供了更为贴切的书写方式，如：[bx].idata、[bx].idata[si]
![image.png](https://bu.dusays.com/2023/04/19/643f3706bad8d.png)

## 寄存器
### 通用寄存器
AX、BX、CX、DX、BP、SP、SI、DI
### 段寄存器
DS、SS、CS、ES
## 寻址方式
![Snipaste_2023-04-19_08-24-19.png](https://bu.dusays.com/2023/04/19/643f35f1dfc30.png)
## 操作数的长度
![image.png](https://bu.dusays.com/2023/04/19/643f36bb8c1a2.png)
![image.png](https://bu.dusays.com/2023/04/19/643f36d1751cc.png)

## 标志寄存器结构图
![image.png](https://bu.dusays.com/2023/03/31/64266b721b208.png)
# 检测点答案（部分）
## 检测点2.1 
（2）最多使用 4 条指令，编程计算 2 的 4 次方
```
mov ax, 2H
add ax, ax
add ax, ax
add ax, ax
```
## 检测点3.1
（2）  

1. 
```
mov ax,6622H
jmp 0ff0:0100
mov ax,2000H
mov ds,ax
mov ax,[0008]
mov ax,[0002]
```
2. 
| 指令          | CS    | IP    | DS    | AX    | BX    |
|---------------|-------|-------|-------|-------|-------|
| mov ax, 6622H | 2000H | 0003H | 1000H | 6622H | 0000H |
| jmp 0ff0:0100 | 0ff0H | 0100H | 1000H | 6622H | 0000H |
| mov ax, 2000H | 0ff0H | 0103H | 1000H | 2000H | 0000H |
| mov ds, ax    | 0ff0H | 0105H | 2000H | 2000H | 0000H |
| mov ax, [0008]| 0ff0H | 0108H | 2000H | C389H | 0000H |
| mov ax, [0002]| 0ff0H | 010BH | 2000H | EA66H | 0000H |
## 检测点3.2
（1）
```
mov ax,2000H 
mov ss,ax
mov sp,0010H
```
（2）
```
mov ax,1000H 
mov ss,ax
mov sp,0000H 
```
## 检测点9.1
（1）
```
assume cs:code

data segment
  db 0, 0, 0    ; 第一个字节可以取8位任意值
data ends

code segment
  start:mov ax, data
        mov ds, ax
        mov bx, 0
        jmp word ptr [bx+1]
code ends
end start
```
（2）
```
assume cs:code

data segment
    dd 12345678H
data ends

code segment
    start:  mov ax, data
            mov ds, ax
            mov bx, 0
            mov [bx], bx        ; 将 bx 段寄存器中的 0 送入，默认是 字 格式
            mov [bx+2], cs
            jum dword ptr ds:[0]
code ends
end start
```
（3）
```
(CS) = 0006H
(IP) = 00BEH
``` 
## 检测点9.2
```
assume cs:code

code segment
    start:  mov ax, 2000H
            mov ds, ax
            mov bx, 0

        s:  mov ch, 0
			mov cl, [bx]
			jcxz ok
			inc bx
			jmp short s

        ok: mov ds, bx

            mov ax, 4c00h
            int 21h

code ends
end start
```
## 检测点9.3
```
assume cs:code

code segment

start:
		mov ax, 2000H
		mov ds, ax
		mov bx, 0

s:	
		mov cl, [bx]
		mov ch, 0
		inc cx        ; loop 命令会先执行 (cx)=(cx)-1，再判断(cx)?=0
		inc bx
		loop s

ok:	
		dec bx
		mov dx, bx

		mov ax, 4c00h
		int 21h
code ends
end start
```
## 检测点10.1
```
...
mov ax, 1000H
...
mov ax, 0000H 
```
## 检测点10.2
```
(ax)=6
预加载指令 call s 时，IP 指向下条指令的地址 (IP)=6
```
## 检测点10.3
```
(ax)=1010H
```
## 检测点10.4
```
(ax)=6+(ss:[bp])=6+5=000BH
```
## 检测点10.5
（1）
```
assume cs:code

stack segment
	dw 8 dup (0)
stack ends

code segment

	start:	mov ax, stack
			mov ss, ax
			mov sp, 16
			mov ds, ax
			mov ax, 0
			call word ptr ds:[0eh]    ; CS:IP 此时指向的是 第一个 inc ax
			inc ax
			inc ax
			inc ax
			mov ax, 4c00h
			int 21h

code ends

end start
```
上述程序执行后，`ax`中的数值：
```
(ax)=3
```
（2）
```
assume cs:code

data segment
	dw 8 dup (0)
data ends

code segment

	start:	mov ax, data
			mov ss, ax
			mov sp, 16
			mov word ptr ss:[0], offset s    ; 标号 s 的偏移地址移至 ss:[0]
			mov ss:[2], cs
			call dword ptr ss:[0]            ; (IP)=(ss:[0])=offset s  (CS)=(ss:[2])=(CS)  
			nop
		s:	mov ax, offset s                 
			sub ax, ss:[0cH]                 ; (ss:[0cH])= nop 指令 的偏移地址
			mov bx, cs
			sub bx, ss:[0eH]                 ; (ss:[0eH])=(CS)
			mov ax, 4c00h
			int 21h

code ends

end start
```
上述程序执行后，`ax` 和 `bx` 的数值为：
```
(ax)=0001H
(bx)=0000H
```
## 检测点11.2
|指令|CF|OF|SF|ZF|PF|AL|
|-|-|-|-|-|-|:-:|
|sub al, al   |0 |0 |0 |1 |1 |0000 0000|
|mov al, 10H  |0 |0 |0 |1 |1 |0001 0000|
|add al, 90H  |0 |0 |1 |0 |1 |1010 0000|
|mov al, 80H  |0 |0 |1 |0 |1 |1000 0000|
|add al, 80H  |1 |1 |0 |1 |1 |0000 0000|
|mov al, 0FCH |1 |1 |0 |1 |1 |1111 1100|
|add al, 05H  |1 |0 |0 |0 |0 |0000 0001|
|add al, 7DH  |1 |0 |0 |0 |0 |0111 1101|
|add al, 0BH  |0 |1 |1 |0 |1 |1000 1000|
## 检测点11.3
（1）
```
...
jb s0
...
ja s0
...
```
（2）
```
...
jna s0
...
jnb s0
...
```
## 检测点11.4
```
mov ax, 0fff0h
add ax, 0010h
```
这两句代码执行过后，`ax = 0000 0000 0000 0000`  

有进位，无溢出，结果为0，各标志位的值分别为：
```
zf = 1
pf = 1
sf = 0
cf = 1
of = 0
df = 0

Flag 寄存器：0000 0000 0100 0101

(ax) = 0000 0000 0100 0101
```
全部执行之后，`ax = 0000 0000 0100 0101`

## 检测点13.1
（1）
```
7ch中断例程所能进行的最大转移位移范围是 [-32768, 32767]

即16位补码所能表示的数的范围。
```
（2）
用 7ch 中断例程完成 **jmp near ptr s** 指令的功能，用 bx 向中断例程传送转移位移。

应用举例：在屏幕的笫 12 行，显示 data 段中以 0 结尾的宇符串 。
```
assume cs:code

data segment

db 'conversation',0

data ends

code segment

start: mov ax,data

mov ds,ax

mov si,0

mov ax,0b800h

mov es,ax

mov di,12*160

s: cmp byte ptr [si],0

je ok ; 如果是 0 跳出循环

mov al,[si]

mov es:[di],al

inc si

add di,2

mov bx,offset s-offset ok ; 设置从标号 ok 到标号 s 的转移位移

int 7ch ; 转移到标号 s 处

ok: mov ax,4c00h

int 21h

code ends

end start
```

`7ch` 中断例程如下：
```
lp:
    push bp         ; 将 bp 这个 ss 栈的偏址保存
    mov bp, sp      ; 将当前栈顶指针值送入到 bp
    add [bp+2], bx  ; 修改 ss 栈中的从栈顶向下第 2 个单元的值
lpret:
    pop bp          ; 恢复 bp 值
    iret            ; 返回到调用处
```
将 7cH 代码写入 0:200H 的装载程序如下：
```
assume cs:code

code segment
start:      ; 7cH 中断例程的安装程序
            mov ax, cs
            mov ds, ax
            mov si, offset lp   ; 将 ds:si 指向源地址（captial 的机器码）
            mov ax, 0000H
            mov es, ax
            mov di, 200H        ; 将 es:di 指向目的地址（0:200H 向量表中）
            mov cx, offset lpend - offset lp    ; 设置传输长度
            cld             ; 传输方向为正
            rep movsb       ; 字节传输
            ; 设置中断向量表，使 7cH 条目中断向量指向 0000:200H
            mov ax, 0000H
            mov es, ax
            mov word ptr es:[7cH*4], 200H
            mov word ptr es:[7cH*4+2], 0000H
            mov ax, 4c00H
            int 21H
;-----------
; 装载的例程：7cH
; 功能：int 7cH 实现和 jmp near ptr s 指令相同的功能
; 入口参数：bx 相对地址偏移量
; 返回值：无
;-----------
lp:
    push bp         ; 将 bp 这个 ss 栈的偏址保存
    mov bp, sp      ; 将当前栈顶指针值送入到 bp
    add [bp+2], bx  ; 修改 ss 栈中的从栈顶向下第 2 个单元的值，即 IP 的值
lpret:
    pop bp          ; 恢复 bp 值
    iret            ; 返回到调用处。
lpend:
    nop             ; 代码段结尾，便于计算 7cH 例程的长度。   

code ends

end start
```
## 检测点14.1
（1）
```
assume cs:code

code segment
start:
    mov al, 2    ; (al)=2，2 号单元
    out 70h, al  ; 选中端口 70h 的 2 号单元
    in  al, 71h  ; 从端口 71h 读出 2 号单元，送入 al

    mov ax, 4c00h
    int 21h
code ends

end start
```
（2）
```
assume cs:code

code segment
start:
    mov al, 2    ; (al) = 2，2 号单元
    out 70h, al  ; 将 al 送入端口 70h，选中 2 号单元
    mov al, 0    ; (al) = 0，写入端口
    out 71h, al  ; 将 (al)=0 写入到 71h 的 2 号单元
    
    mov ax, 4c00h
    int 21h
code ends

end start
```
## 检测点14.2
```
assume cs:code

code segment
start:
    mov bx, ax
    shl ax, 1    ; (ax)=(ax)*2
    mov cl, 3    ; 移动次数大于 1 必须放到 cl
    shl bx, cl   ; (bx)=(ax)*8
    add ax, bx   ; (ax)=(ax)*8+(ax)*2
    
    mov 4c00h
    int 21h
code ends

end start
```
## 检测点15.1
（2）
设置新中断向量表代码：
```
mov ax,0
mov es,ax           ; es 指向中断向量表，内存地址 0 处

...

mov word ptr es:[9*4], offset int9
mov es:[9*4+2],cs   ; 在中断向量表中设置新的 int9 中断例程的入口段地址和偏移地址
                    ; 其中段地址等于当前 cs
```
写回原中断向量表：
```
mov ax,0
mov es,ax       ; es 指向中断向量表，内存地址 0 处

push ds:[0]     ; 从 ds[0]、ds[2] 处取出原 int 9 入口地址
pop es:[9*4]    ; 将中断向量表中 int 9 的入口地址恢复为原地址
push ds:[2]
pop es:[9*4+2]
```
如果在指令执行在这两端程序中间，触发键盘中断事件，那么由于正在设置中断向量表，(ip) 和 (cs) 值可能不确定。为了避免这 2 段代码不受中断事件干扰，需要将中断屏蔽。在这两段代码前后加上 cli 和 sti 指令即可。
```
cli ; 屏蔽任何（可屏蔽）中断

...

sti ; 解除屏蔽（可屏蔽）中断
```
## 检测点16.1
```
assume cs:code
code segment
    a dw 1,2,3,4,5,6,7,8    ; code:[0] ~ code:[15]
    b dd 0                  ; code:[16]~ code:[19]
start:
    mov si,0
    mov cx,8
s:  mov ax,a[si]            ; 将 a 中偏移量为 si 的内存单元按字送入 ax
    add word ptr b[0],ax    ; 与 bx 的低字相加
    adc word ptr b[2],0     ; 与 bx 的高字相加
    add si,2                ; ax 单位为字，因此偏移 2 个字节，偏移量的单位是字节
    loop s

    mov ax,4c00h
    int 21h
code ends
end start
```
## 检测点17.1
“在 int16h 中断例程中，一定有设置 IF=1 的指令。”这种说法对吗？

答案：**对。**

int 16h 中断的 0 号功能，若缓冲区空，则循环等待，直到缓冲区中有数据。所以缓冲区空的时候，它又会继续检测，也就是可以说返回上一步。

int 9h 是将按键信息放入缓冲区。 若没有设置 IF=1 的指令，也即 IF=0，则不会处理任何（可屏蔽）中断，当然也就不能屏蔽 int 9 中断，则缓冲区永远不会有数据放入，这将造成 int 16h 的死循环检测。显然不允许这样的事发生，所以一定有设置 IF=1 的指令。
# 课后实验（部分）
## 实验 3
（3）PSP 的内容
![Snipaste_2023-01-06_16-39-17.png](https://bu.dusays.com/2023/01/06/63b7de3f90329.png)
## 实验 4
（2）
```
assume cs:code

code segment

	mov ax, 0020H
	mov ds, ax        ;(ds) = 0020H 

	mov bx, 0         ;ds:bx 指向 0020:0，即 0:200

	mov cx, 40H       ;循环 64 次

s:  mov ds:[bx], bx   ;((ds) * 16 + bx)) = bx
	inc bx
	loop s

	mov ax, 4c00h
	int 21h

code ends

end
```
（3）
```
assume cs:code
code segment

	mov ax, code
	mov ds, ax
	mov ax, 0020h
	mov es, ax
	mov bx, 0
	mov cx, 17
  s:
	mov al, [bx]
    mov es:[bx], al
    inc bx
    loop s
    mov ax, 4c00h
    int 21h

code ends
end
```
## 实验 5
（1）
```
assume cs:code, ds:data, ss:stack

data segment 
		dw 0123h, 0456h, 0789h, 0abch, 0defh, 0fedh, 0cbah, 0987h
data ends

stack segment 
		dw 0, 0, 0, 0, 0, 0, 0, 0
stack ends

code segment 

start: 
		mov ax, stack 
		mov ss, ax
		mov sp, 16
		
		mov ax, data
		mov ds, ax

		push ds:[0]
		push ds:[2]
		pop ds:[2]
		pop ds:[0]

		mov ax, 4c00h 
		int 21h

code ends

end start
```
（2）
```
assume cs:code, ds:data, ss:stack

data segment 
		dw 0123H, 0456H
data ends

stack segment 
		dw 0, 0
stack ends

code segment 

start: 
		mov ax, stack 
		mov ss, ax
		mov sp, 16
		
		mov ax, data
		mov ds, ax

		push ds:[0]
		push ds:[2]
		pop ds:[2]
		pop ds:[0]

		mov ax, 4c00h 
		int 21h

code ends

end start
```
（3）
```
assume cs:code, ds:data, ss:stack

code segment 

start: 
		mov ax, stack 
		mov ss, ax
		mov sp, 16
		
		mov ax, data
		mov ds, ax

		push ds:[0]
		push ds:[2]
		pop ds:[2]
		pop ds:[0]

		mov ax, 4c00h 
		int 21h

code ends

data segment 
		dw 0123H, 0456H
data ends

stack segment 
		dw 0, 0
stack ends

end start
```
（4）

**都能执行，但只有程序 3 可以正确执行，因为程序 加载后会从程序第一个单元开始执行，但只有 3 中的code段在程序 的开始位置，所以所以只有 3 中的程序 是可以正确执行的**  

（5）**段的大小必须为 16 Byte 的倍数，即最小为 0010H**
```
assume cs:code

a segment 
		db 1, 2, 3, 4, 5, 6, 7, 8    ; db定义字节单元数据、dw字义字单元数据、dd定义双字单元数据
a ends

b segment 
		db 1, 2, 3, 4, 5, 6, 7, 8
b ends

c segment 
		db 0, 0, 0, 0, 0, 0, 0, 0
c ends

code segment 

start:                           ; 由于push与pop指令只对字操作，而这里要操作的是字节，所以不能用push和pop传送数据
		mov ax, a
		mov ds, ax               ; ds定位到a段

		mov ax, b
		mov es, ax               ; es定位到b段

		mov dx, 0
		mov bx, 0                ; 偏移地址
		mov cx, 8                ; 循环次数8次
	s:  
		mov dl, ds:[bx]
		add dl, es:[bx]
		mov ds:[bx+32], dl       ; 将dl的数值传送到c段的偏移位置
                                 
		inc bx
		loop s

		mov ax, 4c00h 
		int 21h

code ends

end start
```
![Snipaste_2023-03-08_12-49-00.png](https://bu.dusays.com/2023/03/08/640813dcec744.png)

（6）
```
assume cs:code

a segment 
	dw 1, 2, 3, 4, 5, 6, 7, 8, 9, 0ah, 0bh, 0ch, 0dh, 0ch, 0dh, 0eh, 0fh, 0ffh
a ends

b segment 
	dw 0, 0, 0, 0, 0, 0, 0, 0
b ends

code segment 

start:
		mov ax, a
		mov ds, ax

		mov ax, b
		mov ss, ax
		mov sp, 10h

		mov bx, 0
		mov cx, 8

	s:
		push [bx]
		add bx, 2
		loop s

		mov ax, 4c00h 
		int 21h
code ends

end start 
```
![Snipaste_2023-03-08_13-03-28.png](https://bu.dusays.com/2023/03/08/6408178cb4cfb.png)
## 实验 6
```
assume cs:codesg, ss:stacksg, ds:datasg

stacksg segment 
	dw 0, 0, 0, 0, 0, 0, 0, 0
stacksg ends

datasg segment 
	db '1. display      '
	db '2. brows        '
	db '3. replace      '
	db '4. modify       '
datasg ends

codesg segment 
	start:
			mov ax, stacksg 
			mov ss, ax
			mov sp, 16

			mov ax, datasg 
			mov ds, ax
			mov bx, 0                ; 每一个数组（即每一行的地址）
			
			mov cx, 4                ; 设置外层循环的次数

		s0:
			push cx                  ; 将外层循环 cx 中的值暂存到 栈 中
			mov si, 0                ; 每一行中元素的下标，相当于数组的下标
			mov cx, 4                ; cx 设置内层循环的次数

		s: 
			mov al, [bx+3+si]    
			and al, 11011111b        ; 将 al 中的 ASCII 码的第 5 位置为 0，小写字母变为大写字母
			mov [bx+3+si], al 
			inc si                   ; si 加 1，指向下一个字母
			loop s 

			add bx, 16
			pop cx                   ; 从栈顶弹出原 cx 的值，恢复 cx
			loop s0

			mov ax, 4c00H
			int 21H
			
codesg ends

end start 
```
## 实验 7
### 参考网络
```
assume cs:codesg,ds:data,es:table

data segment
  db '1975','1976','1977','1978','1979','1980','1981','1982','1983'
  db '1984','1985','1986','1987','1988','1989','1990','1991','1992'
  db '1993','1994','1995'
  ; 以上是表示 21 年的 21 个字符串

  dd 16,22,382,1356,2390,8000,16000,24486,50065,97479,140417,197514
  dd 345980,590827,803530,1183000,1843000,2759000,3753000,4649000,5937000
  ; 以上是表示 21 年公司总收入的 21 个 dword 型数据 
  
  dw 3,7,9,13,28,38,130,220,476,778,1001,1442,2258,2793,4037,5635,8226
  dw 11542,14430,15257,17800
  ; 以上是表示 21 年公司雇员人数的 21 个 word 型数据
data ends

table segment
 db 21 dup('year summ ne ??')
table ends

codesg segment 

start:
		mov ax, data
		mov ds, ax
		sub si, si

		mov ax, table
		mov es, ax
		sub di, di

		sub bx, bx
		mov cx, 21        ; 21 年的 21 个字符串

	s:
		mov ax, [si]      ; 写入年份
		mov es:[di], ax
		mov ax, [si+2]
		mov es:[di+2], ax
		mov byte ptr es:[di+4], 20h

		mov ax, [si+84]   ; 写入公司总收入
		mov es:[di+5], ax
		mov ax, [si+86]
		mov es:[di+7], ax
		mov byte ptr es:[di+9], 20h

		sub si, bx
		mov ax, [si+168]   ; 写入雇员人数
		mov es:[di+10], ax
		mov byte ptr es:[di+12], 20h
		add si, bx

		mov dx, [si+86]    ; 写入人均收入		
	    mov ax, [si+84]         
        div word ptr es:[di+10]   
        mov es:[di+13], ax         
        mov byte ptr es:[di+15], 20h
      			             
        add si, 4          ; data 年份偏移量（年份 4 字节  收入 4 字节）
        add di, 16         ; table 偏移量
        add bx, 2 		   ; data 雇员偏移量（雇员 2 字节）        
        loop s		

		mov ax, 4c00h 
		int 21h
		
codesg ends

end start
```
### 自己书写
```
assume cs: codesg 
data segment 
    db '1975','1976','1977','1978','1979','1980','1981','1982','1983','1984' 
    db '1985','1986','1987','1988','1989','1990','1991','1992','1993','1994' 
    db '1995' 
    ; 以上是表示 21 年的 21 个字符串 
    
    dd 16, 22, 382, 1356, 2390, 8000, 16000, 24486, 50065, 97479
    dd 140417, 197514, 345980, 590827, 803530, 1183000, 1843000, 2759000, 3753000, 4649000
    dd 5937000 
    ; 以上是表示 21 年公司总收入的 21 dword 型数据
    
    dw 3, 7, 9, 13, 28, 38, 130, 220, 476, 778
    dw 1001, 1442, 2258, 2793, 4037, 5635, 8226, 1542, 14430, 15257 
    dw 17800 
    ;以上是表示 21 年公司雇员人数的 21 word 型数据
    
data ends 
table segment 
    db 21 dup ('year summ ne ?? ')     ; 用字符表示对应格式及其字节数
table ends  

codesg segment 
start:
    mov ax, data    ; data 数据段基址
    mov es, ax

    mov ax, table   ; table 数据段基址
    mov ds, ax
    mov bx, 0       ; 雇员偏移量
    mov si, 0       ; 源地址
    mov di, 0       ; 目的地址

    mov cx, 21      ; 21 年的 21 个字符串 

s:
    mov ax, es:[si]           ; 年份
    mov [di], ax
    mov ax, es:[si+2]
    mov [di+2], ax
    mov byte ptr [di+4], 20h  ; 空格

    mov ax, es:[si+84]           ; 收入
    mov [di+5], ax
    mov ax, es:[si+84+2]
    mov [di+5+2], ax
    mov byte ptr [di+9], 20h     ; 空格 

    sub si, bx                   ; 雇员偏移量
    mov ax, es:[si+168]          ; 收入
    mov [di+10], ax
    mov byte ptr [di+12], 20h    ; 空格 
    add si, bx

    mov ax, es:[si+84]           ; 低 16 位
    mov dx, es:[si+84+2]         ; 高 16 位
    div word ptr [di+10]
    mov [di+13], ax              ; 人均收入
    mov byte ptr [di+15], 20h    ; 空格

    add bx, 2
    add di, 16
    add si, 4
    loop s

    mov ax, 4c00H
    int 21H

codesg ends 
end start
```
### 运行结果
![汇编语言.png](https://bu.dusays.com/2023/03/17/6414503018641.png)

## 实验 8
```
assume cs:code
code segment

	mov ax, 4C00H
    int 21H
    
    start:
	        mov ax, 0000H
        s:
            nop                     ; 跳到它的末尾之前的 10 个字节处，刚好是 mov ax, 4C00H，正确返回
            nop
            
            mov di, offset s        ; 标号 s 后的两个空操作被 "jmp short s1" 的机器码覆盖
            mov si, offset s2
            mov ax, cs:[si]
            mov cs:[di], ax
        
        s0:
            jmp short s
        
        s1:
            mov ax, 0000H
            int 21H
            mov ax, 0000H
        
        s2:
            jmp short s1           ; 它的功能：跳到它的末尾之前的 10 个字节处（offset s1 - offset s2+2）
            nop

code ends
end start
```
## 实验 9

## 实验 10
## 实验 11
## 实验 12
## 实验 13
## 实验 14
## 实验 15
## 实验 16
## 实验 17
# 课程设计
## 课程设计 1
## 课程设计 2
# 综合研究
## 研究试验 1 搭建一个精简的 C 语言开发环境
## 研究试验 2 使用寄存器
## 研究试验 3 使用内存空间
## 研究试验 4 不用 main 函数编程
## 研究试验 5 函数如何接受不定数量的参数
# 推荐阅读
- [使用 VS Code 进行 x86 汇编语言 MASM Dosbox Debug (仅适用 Windows 平台)](https://zhuanlan.zhihu.com/p/434925344)
- [Win10下配置汇编语言 （王爽）实验环境](https://www.bilibili.com/video/BV1Gf4y1w75t/?vd_source=ae16ff6478eb15c1b87880540263910b)
- [《汇编语言》第三版检测点答案](https://github.com/sanmianti/AssemblyLanguageTest/blob/master/%E3%80%8A%E6%B1%87%E7%BC%96%E8%AF%AD%E8%A8%80%E3%80%8B%E7%AC%AC%E4%B8%89%E7%89%88%E6%A3%80%E6%B5%8B%E7%82%B9%E7%AD%94%E6%A1%88.md)
- [《汇编语言 王爽著》课后实验参考答案](https://tinylab.org/assembly/)
- [《汇编语言》（第 3 版）的检测点和实验的解答与说明](https://hansimov.gitbook.io/asm-lang/)
***
- [《汇编语言（第4版）》](https://book.douban.com/subject/35038473/)
{{< douban src="https://book.douban.com/subject/35038473/" >}}