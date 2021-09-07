function removeCheck(this) {
  if (confirm("정말 삭제하시겠습니까?") == true) {
    document.this.submit();
  } else {
    return false;
  }
}