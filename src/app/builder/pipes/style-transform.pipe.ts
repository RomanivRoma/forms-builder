import { Pipe, PipeTransform } from '@angular/core';
import { ElementStyle } from 'src/app/interfaces/element-style.interface';
import { Indent } from 'src/app/interfaces/indent.interface';

@Pipe({
  name: 'styleTransform',
})
export class StyleTransformPipe implements PipeTransform {
  transform(value: ElementStyle, ...args: any[]): any {
    const newStyle: ElementStyle = {} as ElementStyle;
    const styleWithPx: string[] = ['fontSize', 'borderRadius', 'height'];
    const styleWithPercent: string[] = ['width'];
    Object.keys(value).forEach((el) => {
      if (styleWithPx.includes(el)) {
        newStyle[el as keyof ElementStyle] = (value[el as keyof ElementStyle] +
          'px') as never;
      } else if (styleWithPercent.includes(el)) {
        newStyle[el as keyof ElementStyle] = (value[el as keyof ElementStyle] +
          '%') as never;
      } else if (el.includes('margin') || el.includes('padding')) {
        const indent: Indent = value[el as keyof ElementStyle] as Indent;
        newStyle[el as keyof ElementStyle] =
          `${indent.top}px ${indent.right}px ${indent.bottom}px ${indent.left}px` as never;
      } else {
        newStyle[el as keyof ElementStyle] = value[el as keyof ElementStyle] as never;
      }
    });
    return newStyle;
  }
}
