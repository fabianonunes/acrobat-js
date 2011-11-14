/*
 acrobat-js - http://github.com/fabianonunes/acrobat-js
 Copyright (c) 2011, Fabiano Nunes
 Released under the BSD License.
*/

this.insertPages ({ 
	nPage: this.numPages-1, 
	cPath: '/c/status6.pdf'
});

var f = this.getField('numproc'), mask = /[1-9]\d{0,6}-\d{2}\.\d{4}\.\d\.\d{2}\.\d{4}/;

f.value = mask.exec(this.documentFileName) || 'Digite o número do processo';

this.pageNum = this.numPages-1;
