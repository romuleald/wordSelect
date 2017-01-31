var selectFullWord = (function () {
    /**
     * @return {Object} Selection
     */
    return function () {
        let selection = document.getSelection();
        var txt = selection.toString();
        var range = document.createRange();
        let i = 0;
        /*
         * first test if we are on border
         * loop until we see space (or any cesure char)
         * then reverse to last state*/

        //todo refactor this, too many conditions
        var testWord = function (startEdge = false, endEdge = false) {
            txt = selection.toString();
            let isStartEdge = false;
            let isEndEdge = false;
            let startPos = selection.anchorOffset - 1;
            let endPos = selection.focusOffset + 1;
            if (startEdge) {
                startPos = selection.anchorOffset;
                isStartEdge = true;
            }
            else if (txt.length && txt[0] === ' ') {
                isStartEdge = true;
                startPos = selection.anchorOffset + 1;
            }

            if (endEdge) {
                endPos = selection.focusOffset;
                isEndEdge = true;
            }
            else if (txt.length && txt[txt.length - 1] === ' ') {
                isEndEdge = true;
                endPos = selection.focusOffset - 1;
            }

            if (startPos != Math.max(startPos, 0)) {
                isStartEdge = true;
                startPos = Math.max(startPos, 0);
            }
            if (endPos != Math.min(endPos, selection.focusNode.length)) {
                isEndEdge = true;
                endPos = Math.min(endPos, selection.focusNode.length);
            }
            range.setStart(selection.anchorNode, Math.max(startPos, 0));
            range.setEnd(selection.focusNode, Math.min(endPos, selection.focusNode.length));
            selection.removeAllRanges();
            selection.addRange(range);

            if (i++ < 20) {
                !(isStartEdge && isEndEdge) && testWord(isStartEdge, isEndEdge);
            }
        };

        testWord();
        return selection;
    };

})();


module.exports = selectFullWord;
