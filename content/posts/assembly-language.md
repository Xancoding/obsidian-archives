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

start:mov ax, 2000H
			mov ds, ax
			mov bx, 0

	s:	mov cl, [bx]
			mov ch, 0
			inc cx        ; loop 命令会先执行 (cx)=(cx)-1，再判断(cx)?=0
			inc bx
			loop s

	ok:	dec bx
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

```
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
（4）**都能执行，但只有程序 3 可以正确执行，因为程序 加载后会从程序第一个单元开始执行，但只有 3 中的code段在程序 的开始位置，所以所以只有 3 中的程序 是可以正确执行的**  

（5）
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
		ov es:[di+2], ax
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

# 推荐阅读
- [Win10下配置汇编语言 （王爽）实验环境](https://www.bilibili.com/video/BV1Gf4y1w75t/?vd_source=ae16ff6478eb15c1b87880540263910b)
- [《汇编语言》第三版检测点答案](https://github.com/sanmianti/AssemblyLanguageTest/blob/master/%E3%80%8A%E6%B1%87%E7%BC%96%E8%AF%AD%E8%A8%80%E3%80%8B%E7%AC%AC%E4%B8%89%E7%89%88%E6%A3%80%E6%B5%8B%E7%82%B9%E7%AD%94%E6%A1%88.md)
- [《汇编语言 王爽著》课后实验参考答案](https://tinylab.org/assembly/)
***
- [《汇编语言（第4版）》](https://book.douban.com/subject/35038473/)
{{< douban src="https://book.douban.com/subject/35038473/" >}}