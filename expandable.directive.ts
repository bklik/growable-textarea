import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'textarea[expandable]',
  host: {
    '(keydown)': 'changeHandler()',
    '(keyup)': 'changeHandler()',
    '(change)': 'changeHandler()',
    '(paste)': 'changeHandler()'
  }
})
export class Expandable implements OnInit {
  element:HTMLTextAreaElement;
  borderOffset:number = 0;
  
  constructor(element:ElementRef) {
    this.element = element.nativeElement;
  }
  
  changeHandler() {
    this.element.style.height = '0px';
    let textHeight:number = this.element.scrollHeight
    this.element.style.height = textHeight + this.borderOffset + 'px';
  }
  
  ngOnInit() {
    let style = window.getComputedStyle(this.element, null);
    this.borderOffset = parseInt(style['border-top-width']) + parseInt(style['border-bottom-width']);
    
    this.element.setAttribute('style', 'resize: none;');
    this.element.style.overflow = 'hidden';
    this.element.style.boxSizing = 'border-box';
    this.element.style.padding = '1px';
    this.element.rows = 1;
  }

}
