import randomcolor from 'randomcolor';

const colors = randomcolor({count: 50});

export default function getColors(count) {
    return colors.slice(0, count);
}
