SELECT `Question`.`id`,
    `Question`.`userId`,
    `Question`.`title`,
    `Question`.`content`,
    `Question`.`createdAt`,
    `Question`.`updatedAt`,
    `QuestionTags`.`id` AS `QuestionTags.id`,
    `QuestionTags`.`questionId` AS `QuestionTags.questionId`,
    `QuestionTags`.`tagName` AS `QuestionTags.tagName`,
    `QuestionTags`.`createdAt` AS `QuestionTags.createdAt`,
    `QuestionTags`.`updatedAt` AS `QuestionTags.updatedAt`
FROM `questions` AS `Question`
    INNER JOIN `questionTags` AS `QuestionTags` ON `Question`.`id` = `QuestionTags`.`questionId`
    AND `QuestionTags`.`tagName` IN ('JAVA', 'PYTHON', 'RUBY')
WHERE `Question`.`userId` != 2