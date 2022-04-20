function handleSuccess (res, data) {
  console.log('data', data);
  if (data) {
    res.status(200).json({
      status: 'success',
      results: data.length,
      data,
    });
  } else {
    res.status(200).json({
      status: 'success',
      data,
    });
  }
}

module.exports = handleSuccess;