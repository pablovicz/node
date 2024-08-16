import { Readable } from 'node:stream';

class OneToHundred extends Readable {

    index = 1;

    _read() {

        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {

                // readable stream accept only buffers as variables
                const buf = Buffer.from(`${i}\n`)
                this.push(buf);
            }
        }, 1000)
    }
}


fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundred(),
    duplex: 'half'
})